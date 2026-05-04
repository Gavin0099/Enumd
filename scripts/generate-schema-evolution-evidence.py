#!/usr/bin/env python3
"""
P3-1: Generate schema_evolution evidence-pack draft from git diff.
"""

from __future__ import annotations

import argparse
import json
import re
import subprocess
from datetime import date
from pathlib import Path
from typing import Any


REPO_ROOT = Path(__file__).resolve().parent.parent
DEFAULT_OUTPUT_DIR = REPO_ROOT / "artifacts" / "runtime" / "evidence"
SCHEMA_TARGET_PATTERNS = (
    "knowledge/**/audit.json",
    "knowledge/**/claims.json",
    "knowledge/**/governance_report.json",
)


def _run_git(args: list[str]) -> str:
    proc = subprocess.run(["git", *args], cwd=REPO_ROOT, capture_output=True, text=True, check=True)
    return proc.stdout


def _collect_changed_files(rev_range: str, staged: bool) -> list[str]:
    if staged:
        out = _run_git(["diff", "--cached", "--name-only"])
    else:
        out = _run_git(["diff", "--name-only", rev_range])
    files = [line.strip() for line in out.splitlines() if line.strip()]
    return files


def _is_schema_target(path: str) -> bool:
    if not path.startswith("knowledge/"):
        return False
    return path.endswith("/audit.json") or path.endswith("/claims.json") or path.endswith("/governance_report.json")


def _extract_added_removed_fields(diff_text: str) -> dict[str, list[str]]:
    added: set[str] = set()
    removed: set[str] = set()
    field_re = re.compile(r'^\s*"([^"]+)"\s*:\s*')
    for line in diff_text.splitlines():
        if line.startswith("+++ ") or line.startswith("--- "):
            continue
        if line.startswith("+"):
            m = field_re.match(line[1:])
            if m:
                added.add(m.group(1))
        elif line.startswith("-"):
            m = field_re.match(line[1:])
            if m:
                removed.add(m.group(1))
    return {"added": sorted(added), "removed": sorted(removed)}


def _build_event_id(changed_files: list[str]) -> str:
    today = date.today().isoformat()
    short_desc = "schema-diff"
    for p in changed_files:
        if "domain_advisory" in p:
            short_desc = "domain-advisory"
            break
        if p.endswith("governance_report.json"):
            short_desc = "governance-report"
    return f"schema-evolution-{today}-{short_desc}"


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate schema_evolution evidence draft from git diff.")
    parser.add_argument("--staged", action="store_true", help="Use staged diff instead of rev-range")
    parser.add_argument("--rev-range", default="HEAD~1..HEAD", help="Git revision range when not using --staged")
    parser.add_argument("--output", default="", help="Optional output path; defaults to artifacts/runtime/evidence/<event>.json")
    args = parser.parse_args()

    changed = _collect_changed_files(args.rev_range, args.staged)
    targets = [p for p in changed if _is_schema_target(p)]
    if not targets:
        print("[schema_evolution_evidence_draft]")
        print("generated=False")
        print("reason=no_schema_target_changes")
        return 0

    if args.staged:
        diff_text = _run_git(["diff", "--cached", "--", *targets])
    else:
        diff_text = _run_git(["diff", args.rev_range, "--", *targets])

    fields = _extract_added_removed_fields(diff_text)
    event_id = _build_event_id(targets)
    output_path = Path(args.output).resolve() if args.output else (DEFAULT_OUTPUT_DIR / f"{event_id}.json")

    payload: dict[str, Any] = {
        "schema_evolution_event_id": event_id,
        "event_type": "schema_evolution",
        "commit_sha": "TO_FILL_AFTER_COMMIT",
        "commit_prefix_used": "schema-evolution:",
        "instrumentation_version": "TO_FILL",
        "changed_files": {
            "source": "git-diff",
            "value": targets,
        },
        "field_diff": {
            "source": "git-diff",
            "value": {
                "added": fields["added"],
                "removed": fields["removed"],
                "renamed": [],
                "type_changed": [],
            },
        },
        "backward_compatible": {
            "source": "manual",
            "value": "TO_FILL",
            "rationale": "TO_FILL",
        },
        "downstream_consumers_updated": {
            "source": "manual",
            "value": "TO_FILL",
            "rationale": "TO_FILL",
        },
        "verdict_or_semantic_changed": {
            "source": "manual",
            "value": "TO_FILL",
            "detail": {},
        },
        "wave_scope": {
            "source": "pipeline",
            "value": "TO_FILL",
        },
        "generated_by": {
            "tool": "scripts/generate-schema-evolution-evidence.py",
            "mode": "staged" if args.staged else "rev-range",
            "rev_range": None if args.staged else args.rev_range,
            "schema_target_patterns": list(SCHEMA_TARGET_PATTERNS),
        },
    }

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    print("[schema_evolution_evidence_draft]")
    print("generated=True")
    print(f"output={output_path}")
    print(f"changed_files={len(targets)}")
    print(f"fields_added={len(fields['added'])}")
    print(f"fields_removed={len(fields['removed'])}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
