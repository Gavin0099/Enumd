/**
 * KnowledgeSourceAdapter — Route B abstraction
 *
 * Decouples the evidence pipeline from Notion so any unreliable knowledge
 * source (Notion, GitLab Wiki, local markdown, etc.) can be plugged in.
 *
 * Implementors: lib/adapters/notion-adapter.ts
 *               lib/adapters/local-markdown-adapter.ts
 *               lib/adapters/gitlab-wiki-adapter.ts
 */

import type { ExtractionSignal, SignalCollector } from "./signals";

export interface PageMeta {
  id: string;
  title: string;
  url: string;
  lastEditedAt: string;
}

export interface ListPagesOpts {
  /** Notion: query a database */
  databaseId?: string;
  /** Notion: crawl children of a page */
  parentPageId?: string;
  /** LocalMarkdownAdapter: root directory to walk */
  rootDir?: string;
  /** GitLabWikiAdapter: override the project configured in env */
  projectId?: string | number;
}

export interface KnowledgeSourceAdapter {
  /** Return metadata for all pages the adapter can see. */
  listPages(opts?: ListPagesOpts): Promise<PageMeta[]>;

  /** Return plain-text content for a single page. */
  getPageContent(pageId: string): Promise<string>;

  /** Return content + extraction signal (used by export pipeline). */
  getPageContentWithSignal(
    pageId: string,
    collector: SignalCollector
  ): Promise<{ markdown: string; signal: ExtractionSignal }>;

  /** Return direct child page IDs (for crawl mode). */
  getChildPageIds(pageId: string): Promise<string[]>;
}
