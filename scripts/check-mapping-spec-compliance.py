#!/usr/bin/env python3
"""
Mapping Spec Compliance Checker — P2-1
Authority: knowledge/production_v1/mapping-spec.md

Validates:
  A. Invariants INV-1 through INV-4
  B. Schema evolution trigger detection
  C. Advisory-only misuse in staged diff

Usage:
  python scripts/check-mapping-spec-compliance.py              # full scan
  python scripts/check-mapping-spec-compliance.py --staged     # pre-commit mode
  python scripts/check-mapping-spec-compliance.py --output F   # write JSON to file F

Exit codes:
  0 = pass
  1 = hard failure (invariant violation or advisory misuse)
  2 = schema_evolution_required (staged changes need schema-evolution: commit)
"""

import argparse
import json
import re
import subprocess
import sys
from pathlib import Path
from typing import NamedTuple

# ─── Authority reference ──────────────────────────────────────────────────────
SPEC_AUTHORITY = "knowledge/production_v1/mapping-spec.md"
REPO_ROOT = Path(__file__).resolve().parent.parent


# ─────────────────────────────────────────────────────────────────────────────
# Spec-derived constants (synchronized with mapping-spec.md)
#
# IMPORTANT: These constants derive from the spec. If mapping-spec.md changes
# any of these definitions, this file MUST be updated in the same commit.
# Divergence between this file and mapping-spec.md is itself an INV violation.
# ─────────────────────────────────────────────────────────────────────────────

# §4: advisory_only fields in governance_report.json and audit.json
# Legitimate uses: building advisory output, reading for display/logging.
# PROHIBITED: using these fields to determine verdict, suppression, gate, block.
ADVISORY_ONLY_FIELDS = [
    "node_signals",          # governance_report.json → advisory → node_signals (§4)
    "signal_counts",         # governance_report.json → advisory → signal_counts (§4)
    "domain_advisory",       # audit.json → domain_advisory (§6)
    "advisory_risk_level",   # internal field derived from domain_advisory.risk_level
    "advisory_signals",      # internal field derived from domain_advisory.signals
]

# §4, INV-1: patterns that indicate advisory field used in DECISION logic (violation).
# Key: must reach a decision outcome (verdict/suppression/gate/block/promote),
# NOT just building advisory output.
# Each entry: (pattern, description, spec_ref)
ADVISORY_DECISION_VIOLATION_PATTERNS = [
    # Advisory field directly modifying suppression or verdict
    (r"domain_advisory\.risk_level\s*(?:===|!==|>|<).*(?:verdict|suppression)\s*=",
     "domain_advisory.risk_level used to modify verdict/suppression", "§4, INV-1"),
    (r"advisory_risk_level.*(?:production_fix_required|gate_blocked|block_action)",
     "advisory_risk_level used to set a blocking action", "§4, INV-1"),
    # node_signals or signal_counts used in enforcement-outcome branch
    (r"node_signals\.(?:length|filter)\s*.*(?:block|gate_fail|reject|prevent|enforce)",
     "node_signals used in enforcement-outcome condition", "§4, INV-1"),
    (r"signal_counts\b.*(?:block|gate_fail|reject|prevent)",
     "signal_counts used in blocking condition", "§4, INV-1"),
    # Inverse: enforcement outcome assigned based on advisory_only field
    (r"(?:verdict|suppression_tier|gate_result)\s*=.*advisory_risk_level",
     "Decision field assigned from advisory_risk_level", "§4, INV-1"),
    (r"(?:verdict|suppression_tier|gate_result)\s*=.*node_signals",
     "Decision field assigned from node_signals", "§4, INV-1"),
]

# §5, INV-2: synthesis verdict vocabulary must not be mapped to framework enforcement.
# Each entry: (synthesis_verdict, framework_enforcement_term)
SYNTHESIS_VERDICT_FRAMEWORK_MAPPING_PATTERNS = [
    # Look for code that equates synthesis verdicts with framework enforcement vocab
    (r"SUPPRESS_DERIVED.*(?:session_block|task_block|gate_fail\b|gate_blocked)",
     "SUPPRESS_DERIVED mapped to framework enforcement action", "§5, INV-2"),
    (r"AUDIT_FLAG.*(?:session_block|task_block|gate_fail\b|gate_blocked)",
     "AUDIT_FLAG mapped to framework enforcement action", "§5, INV-2"),
    (r"(?:session_block|task_block|gate_fail\b|gate_blocked).*SUPPRESS_DERIVED",
     "Framework enforcement action mapped from SUPPRESS_DERIVED", "§5, INV-2"),
]

# §8, INV-3: computation files for versioned contract markers.
# If these files change and the instrumentation_version is NOT bumped,
# it may be a violation if computation semantics changed.
INSTRUMENTATION_COMPUTATION_FILES = {
    "lib/domain-advisory.ts",
    "scripts/production-wave-runner.ts",
}

# §8, INV-3: patterns whose modification requires instrumentation_version bump.
COMPUTATION_SEMANTIC_PATTERNS = [
    "LOW_OVERLAP_THRESHOLD",
    "MIN_CLAIMS_FOR_OVERLAP",
    "CROSS_DOMAIN_SLUG_PATTERNS",
    "LIST_REFERENCE_DOC_PATTERNS",
    r"advisory_risk_level\s*!==\s*['\"]NONE['\"]",  # nodeSignals filter rule
    r"instrumentation_version:\s*['\"]",            # version marker itself
]

# §7, INV-4: files that are legitimately allowed to reference calibration thresholds.
CALIBRATION_THRESHOLD_ALLOWED_FILES = {
    "lib/domain-advisory.ts",
    "scripts/production-wave-runner.ts",
    "scripts/advisory-replay.ts",
}

CALIBRATION_THRESHOLD_PATTERNS = [
    r"\bLOW_OVERLAP_THRESHOLD\b",
    r"low_overlap.*0\.\d+",
    r"overlap_threshold",
]

# §10: file path patterns that trigger schema_evolution event.
SCHEMA_EVOLUTION_FILE_TRIGGERS = [
    r"knowledge/.*audit\.json$",
    r"knowledge/.*claims\.json$",
    r"knowledge/.*governance_report\.json$",
]

# §10: computation changes in these files may trigger schema_evolution.
SCHEMA_EVOLUTION_COMPUTATION_TRIGGERS = {
    "lib/domain-advisory.ts": COMPUTATION_SEMANTIC_PATTERNS,
    "scripts/production-wave-runner.ts": [
        r"advisory_risk_level\s*!==\s*['\"]NONE['\"]",
        r"node_signals",
        r"schema_version",
        r"instrumentation_version",
    ],
}

# ─── Git helpers ──────────────────────────────────────────────────────────────

def get_staged_files() -> list[str]:
    r = subprocess.run(["git", "diff", "--cached", "--name-only"],
                       capture_output=True, text=True)
    return [f.strip() for f in r.stdout.splitlines() if f.strip()]


def get_staged_diff() -> str:
    r = subprocess.run(["git", "diff", "--cached"],
                       capture_output=True, text=True)
    return r.stdout


def get_added_lines(diff: str) -> list[str]:
    return [l[1:] for l in diff.splitlines()
            if l.startswith("+") and not l.startswith("+++")]


def read_file(path: str) -> str | None:
    full = REPO_ROOT / path
    if not full.exists():
        return None
    try:
        return full.read_text(encoding="utf-8")
    except Exception:
        return None


# Scripts excluded from invariant scanning — contain violation pattern strings as literals
# (the checker itself, test runners, fixture metadata). These are NOT production logic.
EXEMPT_SCAN_SCRIPTS = {
    "check-mapping-spec-compliance.py",   # self — defines all violation patterns
    "run-compliance-fixture-tests.py",    # fixture runner — references violation descriptions
}


def normalize_path(p: str) -> str:
    """Normalize to forward slashes for cross-platform set membership."""
    return p.replace("\\", "/")


def is_code_file(path: str) -> bool:
    if not path.endswith((".ts", ".js", ".py")):
        return False
    if Path(path).name in EXEMPT_SCAN_SCRIPTS:
        return False
    return True


# ─── Check A: Invariants ──────────────────────────────────────────────────────

def check_inv1(files: list[str]) -> dict:
    """
    INV-1: advisory section is advisory_only.
    No advisory-only field may be used in promotion/filtering/escalation/gate logic.
    Authority: mapping-spec.md §4, §9 INV-1
    """
    violations = []

    for fp in files:
        if not is_code_file(fp):
            continue
        content = read_file(fp)
        if content is None:
            continue

        lines = content.splitlines()
        for i, line in enumerate(lines, start=1):
            # Skip pure comments
            stripped = line.strip()
            if stripped.startswith("//") or stripped.startswith("#"):
                continue

            for pat, desc, spec_ref in ADVISORY_DECISION_VIOLATION_PATTERNS:
                if re.search(pat, line, re.IGNORECASE):
                    violations.append({
                        "file": fp,
                        "line": i,
                        "text": line.strip()[:120],
                        "pattern": pat,
                        "description": desc,
                        "spec_ref": f"mapping-spec.md {spec_ref}",
                    })

    return {
        "invariant": "INV-1",
        "name": "advisory_section_is_advisory_only",
        "spec_ref": "mapping-spec.md §4, §9",
        "result": "fail" if violations else "pass",
        "violations": violations,
    }


def check_inv2(files: list[str]) -> dict:
    """
    INV-2: synthesis_verdicts not equivalent to framework enforcement.
    Authority: mapping-spec.md §5, §9 INV-2
    """
    violations = []

    for fp in files:
        if not is_code_file(fp):
            continue
        content = read_file(fp)
        if content is None:
            continue

        lines = content.splitlines()
        for i, line in enumerate(lines, start=1):
            stripped = line.strip()
            if stripped.startswith("//") or stripped.startswith("#"):
                continue

            for pat, desc, spec_ref in SYNTHESIS_VERDICT_FRAMEWORK_MAPPING_PATTERNS:
                if re.search(pat, line, re.IGNORECASE):
                    violations.append({
                        "file": fp,
                        "line": i,
                        "text": line.strip()[:120],
                        "description": desc,
                        "spec_ref": f"mapping-spec.md {spec_ref}",
                    })

    return {
        "invariant": "INV-2",
        "name": "synthesis_verdicts_not_equivalent_to_enforcement",
        "spec_ref": "mapping-spec.md §5, §9",
        "result": "fail" if violations else "pass",
        "violations": violations,
    }


def check_inv3(staged_files: list[str], staged_diff: str) -> dict:
    """
    INV-3: instrumentation_version is a versioned contract marker.
    If computation constants changed without version bump → warning (may require action).
    Authority: mapping-spec.md §8, §9 INV-3
    """
    computation_files_staged = [
        f for f in staged_files if f in INSTRUMENTATION_COMPUTATION_FILES
    ]

    if not computation_files_staged:
        return {
            "invariant": "INV-3",
            "name": "instrumentation_version_is_versioned_contract",
            "spec_ref": "mapping-spec.md §8, §9",
            "result": "pass",
            "notes": "No computation files staged — no INV-3 check needed",
            "warnings": [],
            "violations": [],
        }

    added = get_added_lines(staged_diff)
    removed = [l[1:] for l in staged_diff.splitlines()
               if l.startswith("-") and not l.startswith("---")]

    changed_semantics = []
    for pat in COMPUTATION_SEMANTIC_PATTERNS:
        for line in added + removed:
            if re.search(pat, line, re.IGNORECASE):
                changed_semantics.append({"pattern": pat, "line": line.strip()[:100]})

    # Check if instrumentation_version itself was changed (bump present)
    version_bumped = any(
        re.search(r"instrumentation_version", l, re.IGNORECASE)
        for l in added + removed
    )

    violations = []
    warnings = []

    # Distinguish: if semantics changed AND version NOT bumped → likely violation
    # If semantics changed AND version bumped → just warn to verify schema-evolution: event
    semantic_changes = [c for c in changed_semantics
                        if not re.search(r"instrumentation_version", c["pattern"], re.IGNORECASE)]

    if semantic_changes and not version_bumped:
        violations.append({
            "computation_files": computation_files_staged,
            "semantic_changes": semantic_changes,
            "version_bumped": False,
            "required_action": "Bump instrumentation_version AND trigger schema-evolution: event",
            "spec_ref": "mapping-spec.md §8 versioning_rule",
        })
    elif semantic_changes and version_bumped:
        warnings.append({
            "note": "Computation semantics changed and version bumped — verify schema-evolution: commit is planned",
            "semantic_changes": semantic_changes,
            "spec_ref": "mapping-spec.md §8, §10",
        })

    return {
        "invariant": "INV-3",
        "name": "instrumentation_version_is_versioned_contract",
        "spec_ref": "mapping-spec.md §8, §9",
        "result": "fail" if violations else "pass",
        "computation_files_staged": computation_files_staged,
        "version_bumped": version_bumped,
        "warnings": warnings,
        "violations": violations,
    }


def check_inv4(files: list[str]) -> dict:
    """
    INV-4: calibration profile is corpus-specific.
    Threshold constants must not be referenced outside known calibration files.
    Authority: mapping-spec.md §7, §9 INV-4
    """
    violations = []

    unexpected_files = [f for f in files
                        if normalize_path(f) not in CALIBRATION_THRESHOLD_ALLOWED_FILES]

    for fp in unexpected_files:
        if not is_code_file(fp):
            continue
        content = read_file(fp)
        if content is None:
            continue

        lines = content.splitlines()
        for i, line in enumerate(lines, start=1):
            stripped = line.strip()
            if stripped.startswith("//") or stripped.startswith("#"):
                continue
            for pat in CALIBRATION_THRESHOLD_PATTERNS:
                if re.search(pat, line, re.IGNORECASE):
                    violations.append({
                        "file": fp,
                        "line": i,
                        "text": line.strip()[:120],
                        "reason": "Calibration threshold referenced outside corpus-specific files",
                        "allowed_files": sorted(CALIBRATION_THRESHOLD_ALLOWED_FILES),
                        "spec_ref": "mapping-spec.md §7, §9 INV-4",
                    })

    return {
        "invariant": "INV-4",
        "name": "calibration_profile_is_corpus_specific",
        "spec_ref": "mapping-spec.md §7, §9",
        "result": "fail" if violations else "pass",
        "violations": violations,
    }


# ─── Check B: Schema evolution triggers ──────────────────────────────────────

def check_schema_evolution_triggers(staged_files: list[str],
                                    staged_diff: str) -> dict:
    """
    Detect if staged changes require a schema-evolution: commit.
    Authority: mapping-spec.md §10, governance/event-map.yaml
    """
    triggers_matched = []

    # File-path triggers
    for fp in staged_files:
        for pat in SCHEMA_EVOLUTION_FILE_TRIGGERS:
            if re.search(pat, fp):
                triggers_matched.append({
                    "file": fp,
                    "trigger_type": "file_path",
                    "trigger_pattern": pat,
                    "spec_ref": "mapping-spec.md §10",
                })

    # Computation-semantic triggers
    added = get_added_lines(staged_diff)
    removed = [l[1:] for l in staged_diff.splitlines()
               if l.startswith("-") and not l.startswith("---")]

    for fp in staged_files:
        if fp not in SCHEMA_EVOLUTION_COMPUTATION_TRIGGERS:
            continue
        pats = SCHEMA_EVOLUTION_COMPUTATION_TRIGGERS[fp]
        for pat in pats:
            for line in added + removed:
                if re.search(pat, line, re.IGNORECASE):
                    triggers_matched.append({
                        "file": fp,
                        "trigger_type": "computation_semantic",
                        "trigger_pattern": pat,
                        "matched_line": line.strip()[:100],
                        "spec_ref": "mapping-spec.md §10, §8",
                    })
                    break  # one match per file/pattern is enough

    triggered = bool(triggers_matched)
    requirements = []
    if triggered:
        requirements = [
            "Commit prefix must be 'schema-evolution:'",
            "Evidence pack required: artifacts/runtime/evidence/schema-evolution-YYYY-MM-DD-*.json",
            "All required fields in schema_evolution_evidence must be present",
            "Gate: pre_merge_review_gate must produce gate_verdict=pass",
        ]

    return {
        "check": "schema_evolution_trigger",
        "spec_ref": "mapping-spec.md §10, governance/event-map.yaml",
        "triggered": triggered,
        "triggers_matched": triggers_matched,
        "requirements_if_triggered": requirements,
    }


# ─── Check C: Advisory misuse in staged diff ─────────────────────────────────

def check_advisory_misuse_in_diff(staged_diff: str) -> dict:
    """
    Detect if staged diff introduces advisory_only field usage in decision logic.
    Hard failure — highest-value check.
    Authority: mapping-spec.md §4, INV-1
    """
    added = get_added_lines(staged_diff)
    violations = []

    for line in added:
        stripped = line.strip()
        if stripped.startswith("//") or stripped.startswith("#"):
            continue
        for pat, desc, spec_ref in ADVISORY_DECISION_VIOLATION_PATTERNS:
            if re.search(pat, line, re.IGNORECASE):
                violations.append({
                    "added_line": stripped[:120],
                    "pattern": pat,
                    "description": desc,
                    "spec_ref": f"mapping-spec.md {spec_ref}",
                    "verdict": "HARD FAILURE — advisory_only field in decision logic",
                })

    return {
        "check": "advisory_misuse_in_staged_diff",
        "spec_ref": "mapping-spec.md §4, INV-1",
        "result": "fail" if violations else "pass",
        "violations": violations,
    }


# ─── Output ───────────────────────────────────────────────────────────────────

def fmt_result(r: str) -> str:
    return {"pass": "PASS", "fail": "FAIL", "skip": "SKIP"}.get(r, r.upper())


def generate_summary(results: dict) -> str:
    lines = [
        "═══════════════════════════════════════════════════════════════════",
        "  Mapping Spec Compliance Check  (P2-1)",
        f"  Authority: {SPEC_AUTHORITY}",
        "═══════════════════════════════════════════════════════════════════",
        "",
        "  Invariants",
        "  ──────────",
    ]

    for inv_id in ("INV-1", "INV-2", "INV-3", "INV-4"):
        inv = results.get(inv_id, {})
        r = inv.get("result", "skip")
        icon = {"pass": "✓", "fail": "✗", "skip": "~"}.get(r, "?")
        name = inv.get("name", "")
        n = len(inv.get("violations", []))
        suffix = f"  ({n} violation{'s' if n != 1 else ''})" if n else ""
        lines.append(f"  {icon} {inv_id}: {name}{suffix}")
        if r == "fail":
            for v in inv.get("violations", [])[:3]:
                lines.append(f"      ↳ {v.get('file', '')}:{v.get('line', '')}  {v.get('description', '')}")
        for w in inv.get("warnings", [])[:2]:
            lines.append(f"    ⚠ {w.get('note', '')}")

    lines += ["", "  Schema Evolution Triggers", "  ─────────────────────────"]
    se = results.get("schema_evolution_trigger", {})
    if se.get("triggered"):
        lines.append("  ⚠ TRIGGERED — requires schema-evolution: commit")
        for t in se.get("triggers_matched", [])[:5]:
            lines.append(f"    → {t['file']}  [{t['trigger_type']}]")
        lines.append("")
        for req in se.get("requirements_if_triggered", []):
            lines.append(f"    • {req}")
    else:
        lines.append("  ✓ No schema evolution triggers matched")

    lines += ["", "  Advisory Misuse (staged diff)", "  ─────────────────────────────"]
    am = results.get("advisory_misuse_in_diff", {})
    r = am.get("result", "skip")
    if r == "fail":
        lines.append("  ✗ ADVISORY MISUSE DETECTED — HARD FAILURE")
        for v in am.get("violations", [])[:5]:
            lines.append(f"    → {v.get('description', '')}")
            lines.append(f"      line: {v.get('added_line', '')[:80]}")
    elif r == "pass":
        lines.append("  ✓ No advisory_only misuse in staged diff")
    else:
        lines.append("  ~ (no staged diff to check)")

    lines += [""]
    fv = results.get("final_verdict", "unknown")
    icons = {"pass": "✓", "fail": "✗", "schema_evolution_required": "⚠"}
    lines.append(f"  Final verdict: {icons.get(fv, '?')} {fv.upper()}")
    lines.append("")
    if fv == "fail":
        lines.append("  Action required: fix invariant violations before committing.")
    elif fv == "schema_evolution_required":
        lines.append("  Action required: use schema-evolution: commit prefix + evidence pack.")
    else:
        lines.append("  No action required.")
    lines.append("═══════════════════════════════════════════════════════════════════")

    return "\n".join(lines)


# ─── Main ─────────────────────────────────────────────────────────────────────

def main() -> None:
    # Force UTF-8 output on Windows (avoids cp950/cp932 codec failures for box chars)
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    if hasattr(sys.stderr, "reconfigure"):
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")

    parser = argparse.ArgumentParser(description="Mapping Spec Compliance Checker P2-1")
    parser.add_argument("--staged", action="store_true",
                        help="Pre-commit mode: analyze staged diff only")
    parser.add_argument("--files", nargs="+", metavar="FILE",
                        help="Override scan file list (for fixture tests / targeted CI)")
    parser.add_argument("--output", metavar="FILE",
                        help="Write JSON result to FILE")
    parser.add_argument("--quiet", action="store_true",
                        help="Suppress human-readable summary; emit only JSON")
    args = parser.parse_args()

    # Determine file sets
    staged_files: list[str] = []
    staged_diff: str = ""
    try:
        staged_files = get_staged_files()
        staged_diff = get_staged_diff()
    except Exception:
        pass  # Not in a git repo or no staged changes — checks will degrade gracefully

    if args.files:
        # Explicit file list — used for fixture tests and targeted CI scans
        # INV-3 and schema-evolution still check staged diff independently
        scan_files = list(dict.fromkeys(args.files))
        mode = "explicit_files"
    elif args.staged:
        # Pre-commit: only inspect staged files
        scan_files = staged_files
        mode = "staged"
    else:
        # Full scan: all lib/ and scripts/ code files
        scan_files = (
            staged_files
            + [str(p.relative_to(REPO_ROOT))
               for root in ("lib", "scripts")
               for p in (REPO_ROOT / root).rglob("*")
               if p.is_file() and p.suffix in (".ts", ".js", ".py")]
        )
        # Deduplicate
        scan_files = list(dict.fromkeys(scan_files))
        mode = "full_scan"

    results: dict = {
        "spec_authority": SPEC_AUTHORITY,
        "mode": mode,
        "files_scanned": scan_files,
        "staged_files": staged_files,
    }

    # A. Invariant checks
    results["INV-1"] = check_inv1(scan_files)
    results["INV-2"] = check_inv2(scan_files)
    results["INV-3"] = check_inv3(staged_files, staged_diff)
    results["INV-4"] = check_inv4(scan_files)

    # B. Schema evolution triggers (staged diff only)
    results["schema_evolution_trigger"] = check_schema_evolution_triggers(
        staged_files, staged_diff
    )

    # C. Advisory misuse in staged diff
    results["advisory_misuse_in_diff"] = check_advisory_misuse_in_diff(staged_diff)

    # Overall verdict
    hard_failures = any([
        results["INV-1"]["result"] == "fail",
        results["INV-2"]["result"] == "fail",
        results["INV-3"]["result"] == "fail",
        results["INV-4"]["result"] == "fail",
        results["advisory_misuse_in_diff"]["result"] == "fail",
    ])
    schema_evolution_required = results["schema_evolution_trigger"]["triggered"]

    if hard_failures:
        final_verdict = "fail"
    elif schema_evolution_required:
        final_verdict = "schema_evolution_required"
    else:
        final_verdict = "pass"

    results["final_verdict"] = final_verdict

    # Output
    if not args.quiet:
        print(generate_summary(results))

    if args.output:
        Path(args.output).write_text(
            json.dumps(results, indent=2, ensure_ascii=False), encoding="utf-8"
        )
    elif args.quiet:
        print(json.dumps(results, indent=2, ensure_ascii=False))

    # Exit code
    sys.exit(1 if final_verdict == "fail" else 2 if final_verdict == "schema_evolution_required" else 0)


if __name__ == "__main__":
    main()
