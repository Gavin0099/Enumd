/**
 * NotionAdapter — KnowledgeSourceAdapter implementation for Notion
 *
 * Wraps lib/notion.ts behind the source-neutral interface so scripts
 * can be rewritten against KnowledgeSourceAdapter without knowing Notion.
 */

import * as dotenv from "dotenv";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { KnowledgeSourceAdapter, PageMeta } from "../source-adapter";
import {
  notion,
  getPageTitle,
  getPageUrl,
  getPageLastEdited,
  getPageContent,
  getChildPageIds,
} from "../notion";

dotenv.config({ path: ".env.local" });

const RATE_LIMIT_MS = 350;

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function toPageMeta(page: PageObjectResponse): PageMeta {
  return {
    id: page.id,
    title: getPageTitle(page),
    url: getPageUrl(page),
    lastEditedAt: getPageLastEdited(page),
  };
}

export class NotionAdapter implements KnowledgeSourceAdapter {
  async listPages(opts: { databaseId?: string; parentPageId?: string } = {}): Promise<PageMeta[]> {
    if (opts.databaseId) {
      return this._listFromDatabase(opts.databaseId);
    }
    if (opts.parentPageId) {
      return this._listFromParent(opts.parentPageId);
    }
    throw new Error("NotionAdapter.listPages: provide databaseId or parentPageId");
  }

  async getPageContent(pageId: string): Promise<string> {
    const result = await getPageContent(pageId);
    return result.markdown;
  }

  async getChildPageIds(pageId: string): Promise<string[]> {
    return getChildPageIds(pageId);
  }

  private async _listFromDatabase(databaseId: string): Promise<PageMeta[]> {
    const pages: PageMeta[] = [];
    let cursor: string | undefined;

    do {
      const res = await notion.databases.query({
        database_id: databaseId,
        ...(cursor ? { start_cursor: cursor } : {}),
      });
      for (const p of res.results as PageObjectResponse[]) {
        pages.push(toPageMeta(p));
      }
      cursor = res.has_more ? (res.next_cursor ?? undefined) : undefined;
      await sleep(RATE_LIMIT_MS);
    } while (cursor);

    return pages;
  }

  private async _listFromParent(parentPageId: string): Promise<PageMeta[]> {
    const childIds = await getChildPageIds(parentPageId);
    const pages: PageMeta[] = [];

    for (const id of childIds) {
      try {
        const page = (await notion.pages.retrieve({ page_id: id })) as PageObjectResponse;
        pages.push(toPageMeta(page));
        await sleep(RATE_LIMIT_MS);
      } catch {
        // Non-fatal: skip inaccessible pages
      }
    }

    return pages;
  }
}
