#!/usr/bin/env python3
"""
Compliance checker fixture tests — P2-1 validation
Authority: knowledge/production_v1/mapping-spec.md

Proves that check-mapping-spec-compliance.py catches known violations.
Each fixture must produce the expected exit code; failure means the checker
has a false negative (more dangerous than a false positive).

Usage:
  python scripts/run-compliance-fixture-tests.py

Exit codes:
  0 = all fixtures behaved as expected
  1 = one or more fixtures did NOT produce expected exit code (checker has gap)
"""

import json
import subprocess
import sys
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

REPO_ROOT = Path(__file__).resolve().parent.parent
CHECKER   = str(REPO_ROOT / "scripts" / "check-mapping-spec-compliance.py")
FIXTURE_DIR = REPO_ROOT / "test" / "fixtures" / "compliance"

# ─── Fixture table ────────────────────────────────────────────────────────────
# Each test specifies:
#   name          : human label
#   files         : list of fixture paths (relative to REPO_ROOT), or None for full scan
#   expected_exit : expected subprocess exit code (0=pass, 1=fail, 2=schema_evo_required)
#   inv_must_fail : invariant ID that must appear as "fail" in JSON output (or None)
#   note          : why this fixture exists / what it proves

TESTS = [
    {
        "name": "INV-1: advisory_risk_level in verdict assignment",
        "files": ["test/fixtures/compliance/inv1_advisory_in_verdict.ts"],
        "expected_exit": 1,
        "inv_must_fail": "INV-1",
        "note": "Proves checker catches advisory_only field used to assign verdict (§4, INV-1)",
    },
    {
        "name": "INV-2: synthesis verdict mapped to framework enforcement",
        "files": ["test/fixtures/compliance/inv2_synthesis_verdict_mapped.ts"],
        "expected_exit": 1,
        "inv_must_fail": "INV-2",
        "note": "Proves checker catches SUPPRESS_DERIVED → gate_fail/session_block (§5, INV-2)",
    },
    {
        "name": "INV-4: calibration threshold outside allowed files",
        "files": ["test/fixtures/compliance/inv4_calibration_spread.ts"],
        "expected_exit": 1,
        "inv_must_fail": "INV-4",
        "note": "Proves checker catches LOW_OVERLAP_THRESHOLD outside corpus-specific files (§7, INV-4)",
    },
    {
        "name": "BASELINE: full scan of lib/ + scripts/ must pass clean",
        "files": None,
        "expected_exit": 0,
        "inv_must_fail": None,
        "note": "Proves current codebase has zero invariant violations (clean baseline)",
    },
]

# ─── Runner ───────────────────────────────────────────────────────────────────

def run_test(test: dict) -> dict:
    cmd = [sys.executable, CHECKER, "--quiet"]

    if test["files"] is not None:
        cmd += ["--files"] + test["files"]

    result = subprocess.run(
        cmd,
        capture_output=True,
        text=True,
        encoding="utf-8",
        cwd=str(REPO_ROOT),
    )

    # Parse JSON output
    output_json = {}
    try:
        output_json = json.loads(result.stdout)
    except json.JSONDecodeError:
        pass

    actual_exit = result.returncode
    expected_exit = test["expected_exit"]
    exit_ok = (actual_exit == expected_exit)

    # Verify inv_must_fail is actually "fail" in output
    inv_check_ok = True
    inv_must_fail = test.get("inv_must_fail")
    if inv_must_fail and output_json:
        inv_result = output_json.get(inv_must_fail, {}).get("result")
        inv_check_ok = (inv_result == "fail")

    passed = exit_ok and inv_check_ok

    return {
        "name": test["name"],
        "note": test["note"],
        "expected_exit": expected_exit,
        "actual_exit": actual_exit,
        "exit_ok": exit_ok,
        "inv_must_fail": inv_must_fail,
        "inv_actual_result": output_json.get(inv_must_fail, {}).get("result") if inv_must_fail else "N/A",
        "inv_check_ok": inv_check_ok,
        "violations_found": (
            len(output_json.get(inv_must_fail, {}).get("violations", []))
            if inv_must_fail else None
        ),
        "passed": passed,
        "stderr": result.stderr.strip()[:200] if result.stderr.strip() else "",
    }


def main() -> None:
    print("═══════════════════════════════════════════════════════════════════")
    print("  Compliance Checker Fixture Tests")
    print("  Authority: knowledge/production_v1/mapping-spec.md")
    print("═══════════════════════════════════════════════════════════════════")
    print()

    results = []
    all_passed = True

    for test in TESTS:
        r = run_test(test)
        results.append(r)
        icon = "✓" if r["passed"] else "✗"
        print(f"  {icon} {r['name']}")

        if not r["exit_ok"]:
            print(f"      EXIT: expected={r['expected_exit']}  actual={r['actual_exit']}  ← MISMATCH")
            all_passed = False

        if not r["inv_check_ok"]:
            print(f"      INV:  {r['inv_must_fail']} expected=fail  actual={r['inv_actual_result']}  ← NOT CAUGHT")
            all_passed = False

        if r["passed"] and r["inv_must_fail"]:
            n = r["violations_found"] or 0
            print(f"      {r['inv_must_fail']} = fail  ({n} violation{'s' if n != 1 else ''} found)")

        if r["stderr"]:
            print(f"      stderr: {r['stderr'][:120]}")

        print(f"      note: {r['note']}")
        print()

    print("─────────────────────────────────────────────────────────────────")
    if all_passed:
        print("  ✓ All fixtures passed — checker correctly catches known violations")
        print("  ✓ Clean baseline confirmed — no false positives on codebase")
    else:
        print("  ✗ FIXTURE TEST FAILURE — checker has gaps or false negatives")
        print("  Action: review failed fixtures and fix pattern matching in checker")
    print("═══════════════════════════════════════════════════════════════════")

    sys.exit(0 if all_passed else 1)


if __name__ == "__main__":
    main()
