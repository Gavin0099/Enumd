// FIXTURE: inv4_calibration_spread.ts
// Known-bad: INV-4 violation. Checker MUST exit 1.
// Demonstrates: calibration threshold (LOW_OVERLAP_THRESHOLD) referenced outside
// corpus-specific allowed files.
// Authority: mapping-spec.md §7, §9 INV-4
//
// DO NOT import or call this file in production code.
// Purpose: fixture test only — verifies check-mapping-spec-compliance.py catches INV-4.

declare const LOW_OVERLAP_THRESHOLD: number; // fixture: intentionally undefined in production scope

// VIOLATION: LOW_OVERLAP_THRESHOLD referenced in a non-corpus-specific file.
// Per mapping-spec.md §7 INV-4, calibration thresholds are corpus-specific and
// must only appear in: lib/domain-advisory.ts, scripts/production-wave-runner.ts,
// scripts/advisory-replay.ts.
const SPREAD_THRESHOLD = LOW_OVERLAP_THRESHOLD * 1.5;

function isLowOverlap(score: number): boolean {
    return score < LOW_OVERLAP_THRESHOLD;
}
