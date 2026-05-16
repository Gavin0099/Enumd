/**
 * KnowledgeSourceAdapter — Route B abstraction
 *
 * Decouples the evidence pipeline from Notion so any unreliable knowledge
 * source (Notion, GitLab Wiki, local markdown, etc.) can be plugged in.
 *
 * Implementors: lib/adapters/notion-adapter.ts
 */

export interface PageMeta {
  id: string;
  title: string;
  url: string;
  lastEditedAt: string;
}

export interface KnowledgeSourceAdapter {
  /** Return metadata for all pages the adapter can see. */
  listPages(opts?: { databaseId?: string; parentPageId?: string }): Promise<PageMeta[]>;

  /** Return plain-text content for a single page. */
  getPageContent(pageId: string): Promise<string>;

  /** Return direct child page IDs (for crawl mode). */
  getChildPageIds(pageId: string): Promise<string[]>;
}
