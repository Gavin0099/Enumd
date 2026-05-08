#!/usr/bin/env python3
"""Validate ChatGPT lane run ledger completion-contract fields.

Checks docs/status/chatgpt-lane-run-ledger.md rows for:
- commit_hash present (not TBD_AFTER_COMMIT)
- session_id present
- closeout_covered == yes
- mapping_confidence == high
"""

from __future__ import annotations

from pathlib import Path
import re
import sys


LEDGER = Path("docs/status/chatgpt-lane-run-ledger.md")
STATUS_DIR = Path("docs/status")


def _parse_row(line: str) -> list[str]:
    return [c.strip() for c in line.strip().strip("|").split("|")]


def main() -> int:
    if not LEDGER.exists():
        print(f"ERROR: missing ledger file: {LEDGER}")
        return 1

    lines = LEDGER.read_text(encoding="utf-8").splitlines()
    data_rows = [ln for ln in lines if ln.startswith("| run-")]
    if not data_rows:
        print("ERROR: no run rows found in ledger")
        return 1

    failed: list[str] = []
    for row in data_rows:
        cells = _parse_row(row)
        # run_id,date,slice_type,commit_hash,session_id,closeout_covered,mapping_confidence,completion_contract,remarks
        if len(cells) < 9:
            failed.append(f"{cells[0] if cells else 'unknown'}: malformed row")
            continue
        run_id = cells[0]
        commit_hash = cells[3]
        session_id = cells[4]
        closeout_covered = cells[5].lower()
        mapping_confidence = cells[6].lower()

        if not commit_hash or commit_hash == "TBD_AFTER_COMMIT":
            failed.append(f"{run_id}: commit_hash missing")
        if not session_id:
            failed.append(f"{run_id}: session_id missing")
        if closeout_covered != "yes":
            failed.append(f"{run_id}: closeout_covered != yes")
        if mapping_confidence != "high":
            failed.append(f"{run_id}: mapping_confidence != high")

        # Remediation guard: ensure closeout file has resolved semantic slice commit evidence.
        closeout_path = STATUS_DIR / f"chatgpt-lane-{run_id}-closeout.md"
        if not closeout_path.exists():
            failed.append(f"{run_id}: closeout file missing ({closeout_path})")
            continue
        closeout_text = closeout_path.read_text(encoding="utf-8")
        if "pending until commit created" in closeout_text:
            failed.append(f"{run_id}: closeout semantic_slice_commit_exists still pending")

        m = re.search(r"semantic_slice_commit_exists:\s*`yes \(commit: ([0-9a-fA-F]+)\)`", closeout_text)
        if not m:
            failed.append(f"{run_id}: closeout semantic_slice_commit_exists format invalid")
        else:
            closeout_hash = m.group(1)
            if closeout_hash != commit_hash:
                failed.append(
                    f"{run_id}: closeout commit hash ({closeout_hash}) != ledger commit_hash ({commit_hash})"
                )

    if failed:
        print("LEDGER_VALIDATION=FAIL")
        for item in failed:
            print(f"- {item}")
        return 2

    print("LEDGER_VALIDATION=PASS")
    print(f"validated_runs={len(data_rows)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
