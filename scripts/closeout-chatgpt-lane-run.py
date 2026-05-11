#!/usr/bin/env python3
"""Single-entry closeout writer for ChatGPT lane runs.

Writes/updates one session record in artifacts/session-index.ndjson with
explicit session_source tagging for run-06..run-15 observation tracking.
"""

from __future__ import annotations

import argparse
import json
from datetime import datetime
from pathlib import Path

RUNTIME_INDEX = Path("artifacts/session-index.ndjson")
VALID_SOURCES = {"native", "backfill"}


def _now_iso() -> str:
    return datetime.now().astimezone().isoformat(timespec="seconds")


def _load_records() -> list[dict]:
    if not RUNTIME_INDEX.exists():
        return []
    rows: list[dict] = []
    for raw in RUNTIME_INDEX.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line:
            continue
        try:
            rows.append(json.loads(line))
        except json.JSONDecodeError:
            # Preserve non-JSON lines as-is is unnecessary here; file should be NDJSON.
            continue
    return rows


def _write_records(rows: list[dict]) -> None:
    RUNTIME_INDEX.parent.mkdir(parents=True, exist_ok=True)
    content = "\n".join(json.dumps(r, ensure_ascii=False) for r in rows) + "\n"
    RUNTIME_INDEX.write_text(content, encoding="utf-8")


def main() -> int:
    ap = argparse.ArgumentParser(description="Write ChatGPT lane runtime closeout session record.")
    ap.add_argument("--run-id", required=True, help="Run id, e.g. run-06")
    ap.add_argument("--session-id", required=True, help="Session id, e.g. chatgpt-lane-run6-2026-05-11")
    ap.add_argument("--task-intent", required=True, help="Closeout task intent text")
    ap.add_argument("--session-source", required=True, choices=sorted(VALID_SOURCES))
    ap.add_argument("--closeout-status", default="valid", help="closeout_status value (default: valid)")
    ap.add_argument("--closed-at", default="", help="ISO datetime; default now")
    args = ap.parse_args()

    closed_at = args.closed_at.strip() or _now_iso()
    source_tag = f"chatgpt_lane_{args.session_source}_closeout"

    rec = {
        "session_id": args.session_id,
        "closed_at": closed_at,
        "closeout_status": args.closeout_status,
        "task_intent": args.task_intent,
        "has_open_risks": False,
        "source": source_tag,
        "run_id": args.run_id,
        "session_source": args.session_source,
    }

    rows = _load_records()
    replaced = False
    for i, row in enumerate(rows):
        if str(row.get("session_id", "")) == args.session_id:
            rows[i] = rec
            replaced = True
            break
    if not replaced:
        rows.append(rec)

    _write_records(rows)
    print(f"CLOSEOUT_WRITE={'updated' if replaced else 'appended'}")
    print(f"session_id={args.session_id}")
    print(f"session_source={args.session_source}")
    print(f"runtime_index={RUNTIME_INDEX}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
