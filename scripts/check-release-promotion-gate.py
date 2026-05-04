#!/usr/bin/env python3
"""
P2-2: Pre-release promotion gate checker.

Blocks release when any pending schema_evolution / authority_upgrade gate exists.
Also verifies knowledge/synthesis_snapshot.json is present and hashable.
"""

from __future__ import annotations

import argparse
import glob
import hashlib
import json
import sys
from pathlib import Path
from typing import Any


REPO_ROOT = Path(__file__).resolve().parent.parent
DEFAULT_EVIDENCE_DIR = REPO_ROOT / "artifacts" / "runtime" / "evidence"
DEFAULT_SUMMARY_DIR = REPO_ROOT / "artifacts" / "runtime" / "summaries"
DEFAULT_SYNTHESIS_SNAPSHOT = REPO_ROOT / "knowledge" / "synthesis_snapshot.json"


def _read_json(path: Path) -> dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def _sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def _extract_event_id(payload: dict[str, Any], fallback_name: str) -> str:
    for key in ("schema_evolution_event_id", "authority_upgrade_event_id", "event_id"):
        val = payload.get(key)
        if isinstance(val, str) and val.strip():
            return val.strip()
    return fallback_name


def _load_gate_status(summary_glob: str, default_prefix: str) -> dict[str, str]:
    status: dict[str, str] = {}
    for file_path in glob.glob(summary_glob):
        p = Path(file_path)
        try:
            payload = _read_json(p)
        except Exception:
            continue
        event_id = _extract_event_id(payload, f"{default_prefix}:{p.name}")
        gate_result = str(payload.get("gate_result", "unknown")).strip().lower()
        status[event_id] = gate_result
    return status


def _list_raw_event_ids(pattern: str, prefix: str) -> list[str]:
    out: list[str] = []
    for file_path in glob.glob(pattern):
        p = Path(file_path)
        if p.name.endswith(".summary.json"):
            continue
        try:
            payload = _read_json(p)
            event_id = _extract_event_id(payload, f"{prefix}:{p.name}")
        except Exception:
            event_id = f"{prefix}:{p.name}"
        out.append(event_id)
    return sorted(set(out))


def _normalize_pending_field(value: Any) -> list[str]:
    if value is None:
        return []
    if isinstance(value, str):
        if value.strip().lower() == "none":
            return []
        return [value.strip()]
    if isinstance(value, list):
        out = []
        for item in value:
            s = str(item).strip()
            if s:
                out.append(s)
        return out
    return [str(value)]


def main() -> int:
    parser = argparse.ArgumentParser(description="Check release promotion gate (P2-2).")
    parser.add_argument("--evidence-dir", default=str(DEFAULT_EVIDENCE_DIR))
    parser.add_argument("--synthesis-snapshot", default=str(DEFAULT_SYNTHESIS_SNAPSHOT))
    parser.add_argument(
        "--release-evidence",
        default="",
        help="Optional explicit release promotion evidence JSON. If omitted, auto-discover latest release-promotion-*.json.",
    )
    parser.add_argument(
        "--output",
        default=str(DEFAULT_SUMMARY_DIR / "pre-release-promotion-check.json"),
        help="Output JSON summary path.",
    )
    args = parser.parse_args()

    evidence_dir = Path(args.evidence_dir).resolve()
    synthesis_snapshot = Path(args.synthesis_snapshot).resolve()
    output_path = Path(args.output).resolve()

    blocking_events: list[str] = []

    schema_summary_status = _load_gate_status(
        str(evidence_dir / "schema-evolution-*.summary.json"), "schema_evolution"
    )
    authority_summary_status = _load_gate_status(
        str(evidence_dir / "authority-upgrade-*.summary.json"), "authority_upgrade"
    )

    schema_raw_ids = _list_raw_event_ids(str(evidence_dir / "schema-evolution-*.json"), "schema_evolution")
    authority_raw_ids = _list_raw_event_ids(str(evidence_dir / "authority-upgrade-*.json"), "authority_upgrade")

    for event_id in schema_raw_ids:
        gate = schema_summary_status.get(event_id, "missing_summary")
        if gate != "pass":
            blocking_events.append(f"schema_evolution:{event_id}:{gate}")

    for event_id in authority_raw_ids:
        gate = authority_summary_status.get(event_id, "missing_summary")
        if gate != "pass":
            blocking_events.append(f"authority_upgrade:{event_id}:{gate}")

    release_evidence_path: Path | None = None
    if args.release_evidence.strip():
        release_evidence_path = Path(args.release_evidence).resolve()
    else:
        candidates = sorted(evidence_dir.glob("release-promotion-*.json"))
        if candidates:
            release_evidence_path = candidates[-1]

    if release_evidence_path is None or not release_evidence_path.exists():
        blocking_events.append("release_promotion_evidence:missing")
    else:
        payload = _read_json(release_evidence_path)
        pending_schema = _normalize_pending_field(payload.get("pending_schema_evolution_gates"))
        pending_authority = _normalize_pending_field(payload.get("pending_authority_upgrade_gates"))
        for item in pending_schema:
            blocking_events.append(f"release_evidence.pending_schema_evolution_gates:{item}")
        for item in pending_authority:
            blocking_events.append(f"release_evidence.pending_authority_upgrade_gates:{item}")

    synthesis_snapshot_sha = ""
    if not synthesis_snapshot.exists():
        blocking_events.append("synthesis_snapshot:missing")
    else:
        try:
            synthesis_snapshot_sha = _sha256(synthesis_snapshot)
        except Exception as exc:
            blocking_events.append(f"synthesis_snapshot:hash_error:{exc}")

    release_blocked = len(blocking_events) > 0
    result = {
        "release_blocked": release_blocked,
        "blocking_events": blocking_events,
        "synthesis_snapshot_sha": synthesis_snapshot_sha,
        "gate_verdict": "fail" if release_blocked else "pass",
        "evidence_dir": str(evidence_dir),
        "release_evidence": str(release_evidence_path) if release_evidence_path else None,
    }

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    print("[pre_release_promotion_check]")
    print(f"gate_verdict={result['gate_verdict']}")
    print(f"release_blocked={result['release_blocked']}")
    print(f"blocking_events={len(blocking_events)}")
    print(f"output={output_path}")
    return 1 if release_blocked else 0


if __name__ == "__main__":
    raise SystemExit(main())
