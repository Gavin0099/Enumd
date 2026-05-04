#!/usr/bin/env python3
"""
P3-2: post_pipeline_evidence_summary hook implementation for pipeline commits.
"""

from __future__ import annotations

import argparse
import json
import re
import subprocess
from datetime import datetime, timezone
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parent.parent
SUMMARY_DIR = REPO_ROOT / "artifacts" / "runtime" / "summaries"


def _run_git(args: list[str]) -> str:
    proc = subprocess.run(["git", *args], cwd=REPO_ROOT, capture_output=True, text=True, check=True)
    return proc.stdout


def _changed_files(staged: bool, rev_range: str) -> list[str]:
    if staged:
        out = _run_git(["diff", "--cached", "--name-only"])
    else:
        out = _run_git(["diff", "--name-only", rev_range])
    return [line.strip() for line in out.splitlines() if line.strip()]


def _extract_waves(paths: list[str]) -> list[str]:
    waves: set[str] = set()
    for p in paths:
        for m in re.findall(r"wave_\d+", p):
            waves.add(m)
    return sorted(waves)


def _schema_target(path: str) -> bool:
    return (
        path.startswith("knowledge/")
        and (
            path.endswith("/audit.json")
            or path.endswith("/claims.json")
            or path.endswith("/governance_report.json")
        )
    )


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate post_pipeline_evidence_summary artifact.")
    parser.add_argument("--pipeline-run-id", default="", help="Optional pipeline run id")
    parser.add_argument("--staged", action="store_true", help="Use staged diff")
    parser.add_argument("--rev-range", default="HEAD~1..HEAD", help="Git revision range when not staged")
    parser.add_argument("--output", default="", help="Optional explicit output path")
    args = parser.parse_args()

    changed = _changed_files(args.staged, args.rev_range)
    relevant = [p for p in changed if p.startswith("knowledge/") or p.startswith("scripts/") or p.startswith("lib/")]
    waves = _extract_waves(relevant)
    schema_changed = any(_schema_target(p) for p in relevant)
    event_triggered = "schema_evolution" if schema_changed else "none"
    evidence_pack_required = "schema_evolution_evidence" if schema_changed else "none"

    now = datetime.now(timezone.utc)
    run_id = args.pipeline_run_id.strip() or now.strftime("%Y%m%dT%H%M%SZ")
    output = (
        Path(args.output).resolve()
        if args.output
        else SUMMARY_DIR / f"post-pipeline-evidence-summary-{run_id}.json"
    )

    payload = {
        "pipeline_run_id": run_id,
        "waves_affected": waves,
        "schema_changed": schema_changed,
        "event_triggered": event_triggered,
        "evidence_pack_required": evidence_pack_required,
        "changed_files_count": len(relevant),
        "changed_files": relevant,
        "generated_at": now.isoformat(timespec="seconds").replace("+00:00", "Z"),
        "mode": "staged" if args.staged else "rev-range",
        "rev_range": None if args.staged else args.rev_range,
    }

    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    print("[post_pipeline_evidence_summary]")
    print(f"pipeline_run_id={run_id}")
    print(f"schema_changed={schema_changed}")
    print(f"event_triggered={event_triggered}")
    print(f"output={output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
