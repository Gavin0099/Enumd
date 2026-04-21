// FIXTURE: inv2_synthesis_verdict_mapped.ts
// Known-bad: INV-2 violation. Checker MUST exit 1.
// Demonstrates: synthesis_verdict (SUPPRESS_DERIVED) mapped to framework enforcement vocab.
// Authority: mapping-spec.md §5, §9 INV-2
//
// DO NOT import or call this file in production code.
// Purpose: fixture test only — verifies check-mapping-spec-compliance.py catches INV-2.

function enforceFromVerdict(verdict: string) {
    // VIOLATION: SUPPRESS_DERIVED mapped to session_block + gate_fail.
    // Per mapping-spec.md §5 INV-2, synthesis_verdicts vocabulary must not be
    // equated with framework enforcement actions (session_block, gate_fail, etc.).
    const outcome = verdict === 'SUPPRESS_DERIVED' ? { gate_fail: true, session_block: true } : null;
    return outcome;
}
