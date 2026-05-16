# Active Task

## Current Status
- ✅ **Phase 7.1 Completed**: Successfully implemented the "Challengeable Evidence Kernel (v2.7.1)".
- ✅ **Integrity Hardening**: Added Integrity Bands and Categorized Discrepancies.
- ✅ **Environment Fixed**: Restored API connectivity and dual-path observation.

## Next Steps
- [x] Transition to Route B: Abstract Enumd into a reusable evidence framework.
  - `lib/source-adapter.ts`: KnowledgeSourceAdapter interface (2026-05-16)
  - `lib/adapters/notion-adapter.ts`: NotionAdapter wraps lib/notion.ts (2026-05-16)
  - Pending: migrate scripts/export.ts to use NotionAdapter (Route B end-to-end)
- [x] Implement deeper traversal for complex Notion blocks (Synced/Linked).
  - notion-rag/lib/notion.ts: async blocksToText, synced_block, toggle, callout, to_do, divider, table_row (2026-05-16)
