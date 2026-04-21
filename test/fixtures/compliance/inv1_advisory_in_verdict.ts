// FIXTURE: inv1_advisory_in_verdict.ts
// Known-bad: INV-1 violation. Checker MUST exit 1.
// Demonstrates: advisory_only field (advisory_risk_level) used to assign verdict.
// Authority: mapping-spec.md §4, §9 INV-1
//
// DO NOT import or call this file in production code.
// Purpose: fixture test only — verifies check-mapping-spec-compliance.py catches INV-1.

function routeDocument(doc: any) {
    const advisory_risk_level = doc.domain_advisory?.risk_level ?? 'NONE';

    // VIOLATION: verdict assigned directly from advisory_risk_level.
    // Per mapping-spec.md §4 INV-1, advisory_only fields must not reach
    // promotion/filtering/escalation/gate logic.
    const verdict = advisory_risk_level !== 'NONE' ? 'SUPPRESS_DERIVED' : 'PASS';

    return { verdict };
}
