#!/usr/bin/env python3
"""Render docs/status/chatgpt-lane-session-index.md from runtime session index."""

from __future__ import annotations

import json
from pathlib import Path

RUNTIME_INDEX = Path("artifacts/session-index.ndjson")
DOC_INDEX = Path("docs/status/chatgpt-lane-session-index.md")


def main() -> int:
    if not RUNTIME_INDEX.exists():
        print(f"ERROR: missing {RUNTIME_INDEX}")
        return 1

    rows: list[dict] = []
    for line in RUNTIME_INDEX.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line:
            continue
        try:
            obj = json.loads(line)
        except json.JSONDecodeError:
            continue
        sid = str(obj.get("session_id", ""))
        if not sid.startswith("chatgpt-lane-run"):
            continue
        rows.append(obj)

    rows.sort(key=lambda x: str(x.get("session_id", "")))

    lines: list[str] = []
    lines.append("# ChatGPT Lane Session Index")
    lines.append("")
    lines.append("> Derived from `artifacts/session-index.ndjson` (do not hand-edit run rows).")
    lines.append("")
    lines.append("## Runtime-Mapped Runs")
    lines.append("")
    lines.append("| session_id | run_id | task_intent | closeout_status | closed_at | notes |")
    lines.append("|---|---|---|---|---|---|")
    for obj in rows:
        sid = str(obj.get("session_id", ""))
        run_id = str(obj.get("run_id", ""))
        intent = str(obj.get("task_intent", "") or "")
        status = str(obj.get("closeout_status", "") or "")
        closed_at = str(obj.get("closed_at", "") or "")
        source = str(obj.get("source", "") or "runtime")
        notes = f"source={source}"
        lines.append(f"| {sid} | {run_id} | {intent} | {status} | {closed_at} | {notes} |")

    DOC_INDEX.parent.mkdir(parents=True, exist_ok=True)
    DOC_INDEX.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"RENDERED_ROWS={len(rows)}")
    print(f"DOC_INDEX={DOC_INDEX}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
