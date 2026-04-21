# Repo Boundary Policy
> Last updated: 2026-04-21
> Status: Active

---

## Repo Identity

Enumd is a **knowledge artifact + pipeline contract + governance configuration** repo.

It is **not** a raw data dump, a build cache, or a governance engine host.
It is **not** responsible for storing upstream raw sources that can be re-fetched.

The canonical boundary question is:

> Does this file carry **irreproducible audit value**, or is it a **reproducible computation output** from upstream sources?

---

## File Classification

### Tracked (Source of Truth)

| Path pattern | Classification | Reason |
|---|---|---|
| `knowledge/**/synthesis.md` | Knowledge artifact | AI-generated synthesis; non-deterministic, not stably rebuildable |
| `knowledge/**/claims.json` | Pipeline contract surface | Extracted claims consumed downstream; schema changes require migration review |
| `knowledge/**/audit.json` | Pipeline contract surface | Per-document governance decision record; carries schema evolution audit history |
| `knowledge/synthesis_snapshot.json` | Milestone artifact | Point-in-time synthesis state for release reference |
| `knowledge/calibration_v1/**` | Validation data | Pipeline calibration test cases; validates pipeline behavior across model versions |
| `knowledge/synthesis_reviews_db.json` | Review state | Human review verdicts; not rebuildable |
| `knowledge/pilot_trust_report.json` | Evaluation artifact | Trust scoring history |
| `knowledge/policy_regression_report.json` | Regression artifact | Policy regression test results |
| `knowledge/synthesis_A/synthesis_draft.md` | Experiment record | Synthesis narrative output |
| `knowledge/synthesis_A/synthesis_prompt_dump.xml` | Experiment audit material | Prompt assembly evidence; see note below |
| `knowledge/synthesis_A/synthesis_prompt_dump.audit.json` | Experiment audit material | Execution and interpretation trace; see note below |
| `knowledge/synthesis_B/` | Experiment record | Synthesis experiment outputs |

### Not Tracked (gitignored)

| Path pattern | Reason |
|---|---|
| `knowledge/edges.json` | Pure graph computation output; 800K+ lines, fully rebuildable |
| `knowledge/nodes.json` | Graph index; fully rebuildable from pipeline |
| `knowledge/build-report.json` | Pipeline run report; rebuildable |
| `knowledge/graph_diff.json` | Diff report; rebuildable |
| `knowledge/**/source.xml` | Raw Notion export; re-fetchable from upstream |

### synthesis_prompt_dump.* Note

`synthesis_prompt_dump.xml` and `synthesis_prompt_dump.audit.json` are **experiment-only audit materials**.
They must be clearly distinguished from the production knowledge surface (`synthesis.md`, `claims.json`, `audit.json`).

These files are retained because they allow answering:
- Why did a synthesis output look a particular way?
- Was there prompt assembly drift between runs?
- Was a schema/signal change introduced at the prompt level?

**Future accumulation policy**: New dump files are only tracked in these contexts:
- calibration runs
- regression investigations
- schema evolution events
- synthesis failure triage

In all other cases, prompt dumps go to external artifacts, not this repo.

### decision_failure_map.json Status

Classification pending. Do not move or gitignore until confirmed whether it contains:
- Human triage results → keep tracking
- Deterministic aggregation from existing audit/review data → can be gitignored

Default: **keep tracking until explicitly downgraded.**

### Source.xml Archival Note

`source.xml` files are not tracked in this repo, but they are **not disposable**.

Each `source.xml` is a point-in-time snapshot of the Notion source that produced the corresponding `synthesis.md` and `claims.json`. If Notion content drifts over time, losing `source.xml` means losing the ability to audit what the pipeline actually saw.

Archival responsibility:
- **Before removing from git tracking**: produce a manifest (`artifacts/source-snapshots/manifest-YYYY-MM-DD.json`) recording slug, path, byte size, and SHA-256 of each file
- **Preferred**: maintain external snapshot bundles (e.g. `export-YYYY-MM-DD.tar.gz`) outside this repo
- Do not treat gitignore as "safe to delete" — "can re-fetch from Notion" is not the same as "can re-fetch the same version"
- Revisit this policy if Notion API provides stable immutable page versioning

**Current state (2026-04-21)**: source.xml removed from git tracking. External bundle and manifest established. See lifecycle rules below.

- Bundle: `e:/BackUp/Git_EE/source-snapshots/enumd-source-snapshot-2026-04-21.tar.gz`
- Manifest: `artifacts/source-snapshots/manifest-2026-04-21.json`
- sha256: `67f9e74a5c74c6f0c0ae9842cca492d75ea58c497cd3499aad3f829158dc5685`

---

### Source Snapshot Lifecycle

#### When to produce a new bundle

A new `source.xml` bundle is required before any of these events:

| Trigger | Reason |
|---|---|
| New wave added to `production_v1` | New source files would not be in the previous bundle |
| Full Notion re-export | Source content may have drifted; old bundle no longer matches current source |
| Pipeline schema change that touches source ingestion | Source interpretation changed; need before/after snapshots |

Routine `audit.json` schema evolution does NOT require a new bundle if source.xml files were not re-fetched.

#### Naming rule

```
enumd-source-snapshot-YYYY-MM-DD.tar.gz
```

Store at: `e:/BackUp/Git_EE/source-snapshots/` (outside repo, same parent directory)

If a second bundle is produced on the same date, append a sequence: `...-2026-04-21-b.tar.gz`.

#### Manifest minimum fields

Each manifest at `artifacts/source-snapshots/manifest-YYYY-MM-DD.json` must contain:

```json
{
  "generated_at": "YYYY-MM-DD",
  "count": <int>,
  "total_bytes": <int>,
  "bundle": {
    "filename": "enumd-source-snapshot-YYYY-MM-DD.tar.gz",
    "location": "<absolute path to bundle directory>",
    "sha256": "<sha256 of .tar.gz file>",
    "scope": "<which waves/batches are included>",
    "entry_count": <int>
  },
  "entries": [
    { "slug": "...", "path": "knowledge/...", "sha256": "..." }
  ]
}
```

`total_bytes` and `size_bytes` are file sizes before compression.

#### Restore verification

```bash
# 1. Verify bundle integrity
sha256sum e:/BackUp/Git_EE/source-snapshots/enumd-source-snapshot-YYYY-MM-DD.tar.gz
# Compare against manifest bundle.sha256

# 2. List contents
tar -tzf enumd-source-snapshot-YYYY-MM-DD.tar.gz | grep <slug>

# 3. Extract a specific file
tar -xf enumd-source-snapshot-YYYY-MM-DD.tar.gz \
  knowledge/production_v1/<wave>/<slug>/source.xml

# 4. Verify individual file (optional)
# Compare extracted file sha256 against manifest entries[].sha256
```

---

## Commit Type Rules

All commits must use one of these prefixes:

| Prefix | Scope | Notes |
|---|---|---|
| `governance:` | `contract.yaml`, `governance/`, `.governance*`, `AGENTS.md` | Requires reviewer sign-off |
| `authority-upgrade:` | `ai-governance-framework` submodule pointer | External authority version boundary change; see separate policy below |
| `pipeline:` | `lib/`, `scripts/` | Must document which knowledge outputs are affected |
| `knowledge:` | `knowledge/` data sync | Batch pipeline output; routine updates |
| `schema-evolution:` | `knowledge/` when schema of `audit.json` or `claims.json` changes | See below |
| `docs:` | `docs/` content | |
| `chore:` | Tooling, config, housekeeping | |

---

## Mixed PR Policy

**Default: prohibited.**
A PR touching both `governance:` scope and `knowledge/` is rejected by CI unless explicitly justified.

**Exception: allowed with declared cause.**
A `governance:` or `pipeline:` change that legitimately triggers a full knowledge re-sync must:

1. Set PR label `governance-driven-resync` or `schema-evolution`
2. Include in PR description:
   - What governance/pipeline change caused the re-sync
   - Which knowledge outputs were affected
   - Whether any existing verdicts or downstream semantics changed

This exception exists because sometimes a contract or rule change **is** the causal reason for a knowledge corpus update. Breaking the causal chain across two PRs would be worse than allowing the mixed change with documentation.

---

## Authority Upgrade Policy

The `ai-governance-framework` submodule is the **external authority source** for this consuming repo. Updating its pointer is not a dependency bump — it is an **authority version boundary change** that may alter prompt payload, runtime hook behavior, contract semantics, or reporting format.

### What makes it different from other governance changes

| Change type | Scope | Who owns the change |
|---|---|---|
| `governance:` | Consuming repo rules, templates, config | Enumd |
| `authority-upgrade:` | External authority version boundary | Upstream + Enumd compatibility |

An `authority-upgrade:` can silently invalidate consuming-repo assumptions. The review gate exists to make that visible before it lands.

### Minimum review gate before pointer update

Answer all five questions before committing a pointer change:

**1. What layers does this upstream change touch?**

Check which of these are affected in the upstream diff:
- [ ] Prompt payload structure (`AGENTS.base.md`, system prompt templates)
- [ ] Runtime hook behavior (pre/post task hooks, stop hooks)
- [ ] Contract semantics (`contract.yaml` fields, validation rules)
- [ ] Advisory taxonomy (signal types, risk levels, tier definitions)
- [ ] Artifact schema (session verdict format, audit log format, report fields)

**2. Is `contract.yaml` still compatible?**

Verify Enumd's `contract.yaml` satisfies any new interface requirements in the upstream version.

**3. Do any consuming-side documents need updating?**

Check if `governance/SYSTEM_PROMPT.md`, `governance/AGENT.md`, `governance/RULE_REGISTRY.md`, or `AGENTS.md` reference assumptions that the upstream change invalidates.

**4. What is the change level?**

| Level | Description | Required action |
|---|---|---|
| patch | Bug fix, wording clarification, additive fields | Review checklist only |
| minor | New capability, new signal type, new hook | Review + update consuming docs if needed |
| major | Contract interface change, breaking schema, removal | Must update consuming repo before or in same PR |

**5. Can this be done as a standalone commit?**

An `authority-upgrade:` commit must not be mixed with:
- `knowledge:` data sync (knowledge churn must not obscure authority boundary changes)
- `schema-evolution:` events
- `pipeline:` logic changes
- Routine `chore:` housekeeping

If a pointer update legitimately triggers downstream changes (e.g., consuming doc update), include them in the same `authority-upgrade:` commit with explanation.

### Commit message format

```
authority-upgrade: advance ai-governance-framework to <short-sha>

Upstream changes:
- <what changed, which layer>

Review gate:
- Layers affected: <list from gate question 1>
- contract.yaml compatible: yes / yes with update / no (blocked)
- Consuming docs updated: yes / none required
- Change level: patch / minor / major

No consuming-side behavior change expected.
```

### Prohibition

**A submodule pointer update is never a "quick dependency bump."**

If you find yourself thinking "I'll just update the submodule pointer real quick while I'm in here" — stop. Open a separate commit. Fill in the review gate. Then decide if this is the right time to absorb that authority version.

---

## Schema Evolution Events

`claims.json` and `audit.json` are **pipeline contract surfaces**, not plain data.

If a pipeline change modifies the schema of either file (adds fields, changes types, renames keys), it must be treated as a **schema evolution event**, not a routine `knowledge:` sync.

Requirements for schema evolution commits:
1. Use prefix `schema-evolution:`
2. Document: what field changed, why, and whether downstream consumers need updates
3. If the schema change breaks backward compatibility: open a migration issue before committing

Example commit message format:

```
schema-evolution: add domain_advisory field to audit.json (pipeline v1.0)

Pipeline introduced domain_advisory instrumentation across all audit records.
This is a corpus-wide schema evolution, not incidental content churn.

Changes:
- audit.json: added domain_advisory { risk_level, signals, corpus_overlap_score }
- instrumentation_version: "1.0"

Impact:
- No existing verdict or downstream semantic changed
- New field is additive; no consumer migration required
```

---

## Runtime Session Artifact Policy

`artifacts/runtime/` contains per-session governance enforcement evidence. These are **not** operational logs. They form the canonical evidence chain for governance decisions.

### Structure

Each completed session produces artifacts across 6 sub-directories:

| Sub-directory | Content | Retention class |
|---|---|---|
| `verdicts/` | Gate decision, `gate_blocked`, `decision_governance` | Permanent |
| `closeouts/` | Session end state | Permanent |
| `canonical-audit-log.jsonl` | Master audit trail (append-only) | Permanent |
| `summaries/` | Human-readable session summaries | Permanent |
| `curated/` | Curated evidence for reviewer handoff | Permanent |
| `candidates/` | Pre-gate candidate records | Permanent |
| `traces/` | Execution traces | Permanent |

### Inclusion Rule

**All completed sessions are tracked.** A session that ran governance processing and closed is canonical evidence regardless of verdict outcome.

Do not selectively track only "interesting" sessions — the absence of an adverse verdict is also evidence.

### Archival Rule

There is no automatic purge. If repository size becomes a concern, archive sessions older than a defined cutoff to external storage and record the archive event in a manifest. Never delete without a manifest.

### Commit Rule

New session artifacts are committed with prefix `governance:`. They must not be mixed with:
- `chore:` / `.gitignore` changes
- `knowledge:` data sync
- `pipeline:` logic changes

Batch-committing multiple sessions in one `governance:` commit is acceptable if they represent a single pipeline run or test batch.

---

## What Does Not Belong in This Repo

- Raw Notion page content in non-XML form (belongs in Notion or archive)
- Governance engine code (belongs in ai-governance-framework)
- CI/CD pipeline authority definitions (belongs in ai-governance-framework or central CI config)
- Unreviewed scratch experiments (belongs in `scratch/`, not `knowledge/`)
