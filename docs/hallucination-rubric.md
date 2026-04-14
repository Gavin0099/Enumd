# Hallucination Rubric (Production v1)

This document defines the formal criteria for identifying **Hallucinations** and **Quality Issues** in AI-generated synthesis. 

## 1. Logic Hallucinations (Major - ZERO TOLERANCE)
Any of the following constitutes a "Logic Hallucination" and triggers a **WAVE BLOCK**.

| Type | Definition | Example |
| :--- | :--- | :--- |
| **Fabricated Dependency** | Claiming a node depends on another when no edge exists in the graph. | "Node A requires Node B" (No edge A->B). |
| **Causal Escalation** | Turning a "related to" (0.22 score) into a "caused by" or "hard requirement". | "Topic A is the root cause of Topic B". |
| **Scope Fabrication** | Inventing specific ownership, departments, or tool names not in the context. | Claiming a tool is owned by "Firmware Team" when not mentioned. |
| **Fact Escalation** | Turning a "low confidence" or "advisory-only" neighbor into a confirmed fact. | "X is fixed" (Source only says "investigating X"). |
| **Invented Procedures** | Describing step-by-step flows or procedures not present in the nodes. | Inventing a 5-step login process that isn't in any source node. |

## 2. Minor Quality Issues (<= 10% Tolerance)
These are acceptable in limited quantities but must be documented.

| Type | Definition |
| :--- | :--- |
| **Formatting Drifts** | Inconsistent Markdown nesting or broken table formatting. |
| **Redundancy** | Repeating similar information from different source nodes without deduplication. |
| **Compression Loss** | Missing a specific detail that was present in the source but isn't critical to logic. |
| **Naming Noise** | Using the slug instead of the Title for internal references once or twice. |

## 3. Reviewer Checklist
1. **Source Check**: Can I find every major claim in the `synthesis_prompt_dump.xml`?
2. **Boundary Check**: Did the model stay within the nodes listed in the Audit?
3. **Logic Check**: Are the connections made in the text mirrored by edges (even weak ones) in the graph?

## 4. The Verifiability Framework (Segment 5.0.2)
To move from Traceability to Verifiability, every major claim in the synthesis must be categorized.

### Claim Tiers
| Tier | Definition | Risk Level | Evidence Requirement |
| :--- | :--- | :--- | :--- |
| **Explicit** | Directly stated in source context. | **LOW** | Direct keyword match in XML. |
| **Derived** | Logical aggregation of facts from 1-2 nodes. | **MID** | Supporting facts identified in XML. |
| **Inferred** | Logical bridge across sparse nodes or missing data. | **HIGH** | Requires at least 2 **Semantic Anchors**. |

### The Inference Boundary (Standard for Release)
An **Inferred Claim** is only valid if it connects concepts via a shared:
1. **Technical ID** (Project code, Protocol name, Error code).
2. **Temporal Anchor** (Same date, Same meeting context).
3. **Actor Anchor** (Same engineer, Same department).

**If an Inferred Claim lacks these anchors, it is classified as a "Logic Hallucination" (Major).**

## 5. Enforcement Policy (Segment 5.0.3)
Observing a hallucination is insufficient; the system must **Neutralize** it.

### Mandatory Actions
| Scenario | Action | Syntax Requirement |
| :--- | :--- | :--- |
| **Unanchored Logic** | **PURGE** | Must be removed from the synthesis entirely. |
| **Plausible Inference** | **DOWNGRADE** | Must be prefixed with "Context hints at..." or "Possible interpretation...". |
| **Fact Escalation** | **ROLLBACK** | Must revert the sentence to match the source's original certainty level. |

### The "Clean" Protocol
A node only passes the **Enforcement Gate** if:
1. **Zero Certain Statements** exist for `INFERRED` claims.
2. **Zero Fabricated Relations** exist.
3. **Traceability** is 100% for all remaining technical claims.
