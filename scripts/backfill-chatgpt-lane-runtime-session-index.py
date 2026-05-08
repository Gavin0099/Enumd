#!/usr/bin/env python3
"""Backfill runtime session-index entries for ChatGPT lane pilot runs.

Source of truth for backfill input:
- docs/status/chatgpt-lane-run-ledger.md
- docs/status/chatgpt-lane-run-0N-closeout.md

Target:
- artifacts/session-index.ndjson
"""

from __future__ import annotations

import json
from pathlib import Path
import re

LEDGER = Path("docs/status/chatgpt-lane-run-ledger.md")
RUNTIME_INDEX = Path("artifacts/session-index.ndjson")
STATUS_DIR = Path("docs/status")


def _parse_markdown_rows(text: str) -> list[dict[str, str]]:
    rows: list[dict[str, str]] = []
    for line in text.splitlines():
        if not line.startswith("| run-"):
            continue
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        if len(cells) < 9:
            continue
        rows.append(
            {
                "run_id": cells[0],
                "session_id": cells[4],
            }
        )
    return rows


def _extract_closeout_fields(run_id: str) -> dict[str, str]:
    path = STATUS_DIR / f"chatgpt-lane-{run_id}-closeout.md"
    if not path.exists():
        return {}
    text = path.read_text(encoding="utf-8")
    fields: dict[str, str] = {}
    for key in ("closed_at", "closeout_status", "task_intent"):
        m = re.search(rf"- {key}:\s*`([^`]+)`", text)
        if m:
            fields[key] = m.group(1).strip()
    return fields


def _load_runtime_ids() -> set[str]:
    if not RUNTIME_INDEX.exists():
        return set()
    ids: set[str] = set()
    for line in RUNTIME_INDEX.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line:
            continue
        try:
            obj = json.loads(line)
        except json.JSONDecodeError:
            continue
        sid = obj.get("session_id")
        if isinstance(sid, str):
            ids.add(sid)
    return ids


def main() -> int:
    if not LEDGER.exists():
        print(f"ERROR: missing {LEDGER}")
        return 1

    rows = _parse_markdown_rows(LEDGER.read_text(encoding="utf-8"))
    if not rows:
        print("ERROR: no chatgpt lane rows found in ledger")
        return 1

    existing_ids = _load_runtime_ids()
    appended = 0
    RUNTIME_INDEX.parent.mkdir(parents=True, exist_ok=True)
    with RUNTIME_INDEX.open("a", encoding="utf-8", newline="\n") as f:
        for row in rows:
            sid = row["session_id"]
            if sid in existing_ids:
                continue
            closeout = _extract_closeout_fields(row["run_id"])
            closed_at = closeout.get("closed_at", "")
            closeout_status = closeout.get("closeout_status", "")
            task_intent = closeout.get("task_intent", "")
            if not (closed_at and closeout_status and task_intent):
                print(f"SKIP: missing closeout fields for {row['run_id']}")
                continue
            obj = {
                "session_id": sid,
                "closed_at": closed_at,
                "closeout_status": closeout_status,
                "task_intent": task_intent,
                "has_open_risks": False,
                "source": "chatgpt_lane_docs_backfill",
                "run_id": row["run_id"],
            }
            f.write(json.dumps(obj, ensure_ascii=False) + "\n")
            appended += 1

    print(f"BACKFILL_APPENDED={appended}")
    print(f"RUNTIME_INDEX={RUNTIME_INDEX}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
