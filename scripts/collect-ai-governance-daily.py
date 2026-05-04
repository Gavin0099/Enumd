#!/usr/bin/env python3
"""
Daily AI governance collector.

Inputs (required):
  - CLI summary JSON
  - CFU summary JSON

Outputs:
  - artifacts/governance/daily/raw/<YYYY-MM-DD>/{cli.json,cfu.json}
  - artifacts/governance/daily/daily_status/<YYYY-MM-DD>.json
  - artifacts/governance/daily/trend.csv
  - artifacts/governance/daily/stop_condition.json
"""

from __future__ import annotations

import argparse
import csv
import json
from datetime import date, datetime
from pathlib import Path
from typing import Any


REPO_ROOT = Path(__file__).resolve().parent.parent
DAILY_ROOT = REPO_ROOT / "artifacts" / "governance" / "daily"
RAW_ROOT = DAILY_ROOT / "raw"
STATUS_ROOT = DAILY_ROOT / "daily_status"
TREND_CSV = DAILY_ROOT / "trend.csv"
STOP_CONDITION_JSON = DAILY_ROOT / "stop_condition.json"


FIELDS = [
    "evidence_status",
    "sample_status",
    "daily_contract_validation.status",
    "phase1_activation_coverage.status",
    "PHASE1_EXIT",
    "phase1_exit.reasons",
    "session_count",
    "runtime_validation_status",
]


def _read_json(path: Path) -> dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def _write_json(path: Path, payload: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def _get_in(data: dict[str, Any], dotted_key: str) -> Any:
    cur: Any = data
    for key in dotted_key.split("."):
        if not isinstance(cur, dict) or key not in cur:
            return None
        cur = cur[key]
    return cur


def _first_of(data: dict[str, Any], candidates: list[str], default: Any = "UNKNOWN") -> Any:
    for c in candidates:
        value = _get_in(data, c)
        if value is not None:
            return value
    return default


def _extract_one(source: dict[str, Any]) -> dict[str, Any]:
    reasons = _first_of(
        source,
        ["phase1_exit.reasons", "phase1.exit.reasons", "PHASE1_EXIT_REASONS"],
        default=[],
    )
    if isinstance(reasons, str):
        reasons = [reasons]
    if not isinstance(reasons, list):
        reasons = []

    session_count = _first_of(
        source,
        ["session_count", "sessions.count", "meta.session_count"],
        default=0,
    )
    if not isinstance(session_count, int):
        try:
            session_count = int(session_count)
        except Exception:
            session_count = 0

    return {
        "evidence_status": _first_of(source, ["evidence_status"]),
        "sample_status": _first_of(source, ["sample_status"]),
        "daily_contract_validation.status": _first_of(
            source, ["daily_contract_validation.status", "daily_contract_validation_status"]
        ),
        "phase1_activation_coverage.status": _first_of(
            source, ["phase1_activation_coverage.status", "phase1_activation_coverage_status"]
        ),
        "PHASE1_EXIT": _first_of(source, ["PHASE1_EXIT", "phase1_exit.status"]),
        "phase1_exit.reasons": reasons,
        "session_count": session_count,
        "runtime_validation_status": _first_of(
            source, ["runtime_validation_status", "runtime_validation.status"]
        ),
        "integrity_error": _has_integrity_error(source),
    }


def _has_integrity_error(source: dict[str, Any]) -> bool:
    text_hits = [
        _first_of(source, ["integrity_error", "integrity.status", "integrity"]),
        _first_of(source, ["schema_validation.status", "schema_status"]),
        _first_of(source, ["fk_validation.status", "fk_status"]),
    ]
    for value in text_hits:
        if value is None:
            continue
        s = str(value).lower()
        if "fail" in s or "error" in s or "fk" in s or "schema" in s:
            return True
    for key in ["integrity_error_count", "schema_error_count", "fk_error_count"]:
        val = _first_of(source, [key], default=0)
        try:
            if int(val) > 0:
                return True
        except Exception:
            pass
    return False


def _merge_status(cli: dict[str, Any], cfu: dict[str, Any]) -> dict[str, Any]:
    out: dict[str, Any] = {}
    for field in FIELDS:
        if field == "phase1_exit.reasons":
            merged: list[str] = []
            for item in [*cli[field], *cfu[field]]:
                if item not in merged:
                    merged.append(item)
            out[field] = merged
            continue
        if field == "session_count":
            out[field] = int(cli[field]) + int(cfu[field])
            continue
        if cli[field] == cfu[field]:
            out[field] = cli[field]
        else:
            out[field] = f"MIXED(cli={cli[field]}, cfu={cfu[field]})"
    out["integrity_error"] = bool(cli["integrity_error"] or cfu["integrity_error"])
    out["all_day_insufficient_evidence"] = (
        str(cli["evidence_status"]).lower() == "insufficient_evidence"
        and str(cfu["evidence_status"]).lower() == "insufficient_evidence"
    )
    return out


def _load_daily_rows() -> list[dict[str, Any]]:
    if not TREND_CSV.exists():
        return []
    with TREND_CSV.open("r", encoding="utf-8", newline="") as f:
        return list(csv.DictReader(f))


def _save_daily_rows(rows: list[dict[str, Any]]) -> None:
    TREND_CSV.parent.mkdir(parents=True, exist_ok=True)
    headers = ["date", *FIELDS, "all_day_insufficient_evidence", "integrity_error"]
    with TREND_CSV.open("w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=headers)
        writer.writeheader()
        for r in rows:
            writer.writerow({k: r.get(k, "") for k in headers})


def _evaluate_stop_condition(rows: list[dict[str, Any]], consecutive_days: int) -> dict[str, Any]:
    rows_sorted = sorted(rows, key=lambda r: r["date"])
    recent = rows_sorted[-consecutive_days:]
    if len(recent) < consecutive_days:
        return {
            "eligible_for_next_stage": False,
            "reason": f"need_{consecutive_days}_days_data",
            "window_days": len(recent),
        }

    pass_any_day = any(str(r["daily_contract_validation.status"]).upper() == "PASS" for r in recent)
    not_all_insufficient = all(str(r["all_day_insufficient_evidence"]).lower() != "true" for r in recent)
    no_integrity_error = all(str(r["integrity_error"]).lower() != "true" for r in recent)

    eligible = pass_any_day and not_all_insufficient and no_integrity_error
    return {
        "eligible_for_next_stage": eligible,
        "window_days": consecutive_days,
        "window_start": recent[0]["date"],
        "window_end": recent[-1]["date"],
        "conditions": {
            "at_least_one_day_daily_contract_validation_pass": pass_any_day,
            "no_all_day_insufficient_evidence": not_all_insufficient,
            "no_new_integrity_error_fk_or_schema_fail": no_integrity_error,
        },
        "next_action": (
            "Can start P2-B and activation-path coverage (retry/recovery/idle_timeout)."
            if eligible
            else "Keep stabilizing samples; do not start P2-B coverage tracking yet."
        ),
    }


def main() -> int:
    parser = argparse.ArgumentParser(description="Collect daily CLI/CFU governance summaries and evaluate stop condition.")
    parser.add_argument("--date", dest="day", default=date.today().isoformat(), help="Collection date (YYYY-MM-DD)")
    parser.add_argument("--cli-json", required=True, help="Path to CLI summary JSON")
    parser.add_argument("--cfu-json", required=True, help="Path to CFU summary JSON")
    parser.add_argument("--window-days", type=int, default=3, help="Stop-condition consecutive window size")
    args = parser.parse_args()

    day = datetime.strptime(args.day, "%Y-%m-%d").date().isoformat()
    cli_path = Path(args.cli_json).resolve()
    cfu_path = Path(args.cfu_json).resolve()

    cli_src = _read_json(cli_path)
    cfu_src = _read_json(cfu_path)

    day_raw_dir = RAW_ROOT / day
    _write_json(day_raw_dir / "cli.json", cli_src)
    _write_json(day_raw_dir / "cfu.json", cfu_src)

    cli_row = _extract_one(cli_src)
    cfu_row = _extract_one(cfu_src)
    merged = _merge_status(cli_row, cfu_row)
    merged["date"] = day

    _write_json(
        STATUS_ROOT / f"{day}.json",
        {
            "date": day,
            "sources": {"cli": cli_row, "cfu": cfu_row},
            "daily_merged": merged,
        },
    )

    rows = [r for r in _load_daily_rows() if r["date"] != day]
    rows.append(merged)
    rows = sorted(rows, key=lambda r: r["date"])
    _save_daily_rows(rows)

    stop = _evaluate_stop_condition(rows, args.window_days)
    _write_json(STOP_CONDITION_JSON, stop)

    print(f"[daily_collect] date={day}")
    print(f"raw_saved={day_raw_dir}")
    print(f"trend_csv={TREND_CSV}")
    print(f"stop_condition={STOP_CONDITION_JSON}")
    print(f"eligible_for_next_stage={stop.get('eligible_for_next_stage')}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
