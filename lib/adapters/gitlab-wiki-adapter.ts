import * as dotenv from "dotenv";
import type { KnowledgeSourceAdapter, ListPagesOpts, PageMeta } from "../source-adapter";
import type { ExtractionSignal, SignalCollector } from "../signals";

dotenv.config({ path: ".env.local" });

interface GitLabWikiPage {
  slug: string;
  title: string;
  content?: string;
  format: string;
}

export class GitLabWikiAdapter implements KnowledgeSourceAdapter {
  private readonly baseUrl: string;
  private readonly token: string;
  private readonly projectId: string;

  constructor() {
    this.baseUrl = (process.env.GITLAB_BASE_URL ?? "").replace(/\/$/, "");
    this.token = process.env.GITLAB_TOKEN ?? "";
    this.projectId = process.env.GITLAB_PROJECT_ID ?? "";
    if (!this.baseUrl || !this.token || !this.projectId) {
      throw new Error(
        "GitLabWikiAdapter: set GITLAB_BASE_URL, GITLAB_TOKEN, GITLAB_PROJECT_ID in .env.local"
      );
    }
  }

  async listPages(opts: ListPagesOpts = {}): Promise<PageMeta[]> {
    const projectId = opts.projectId?.toString() ?? this.projectId;
    const url = `${this.baseUrl}/api/v4/projects/${encodeURIComponent(projectId)}/wikis`;
    const res = await fetch(url, { headers: { "PRIVATE-TOKEN": this.token } });
    if (!res.ok) throw new Error(`GitLab API error ${res.status}: ${await res.text()}`);
    const pages: GitLabWikiPage[] = await res.json();
    return pages.map((p) => this._toPageMeta(p, projectId));
  }

  async getPageContent(slug: string): Promise<string> {
    return (await this._fetchPage(slug)).markdown;
  }

  async getPageContentWithSignal(
    slug: string,
    collector: SignalCollector
  ): Promise<{ markdown: string; signal: ExtractionSignal }> {
    const { markdown } = await this._fetchPage(slug);
    return { markdown, signal: collector.getSignal() };
  }

  async getChildPageIds(_slug: string): Promise<string[]> {
    return [];
  }

  private async _fetchPage(slug: string): Promise<{ markdown: string }> {
    const url = `${this.baseUrl}/api/v4/projects/${encodeURIComponent(this.projectId)}/wikis/${encodeURIComponent(slug)}`;
    const res = await fetch(url, { headers: { "PRIVATE-TOKEN": this.token } });
    if (!res.ok) throw new Error(`GitLab API error ${res.status}: ${await res.text()}`);
    const page: GitLabWikiPage = await res.json();
    return { markdown: page.content ?? "" };
  }

  private _toPageMeta(page: GitLabWikiPage, projectId: string): PageMeta {
    // GitLab Wiki list API does not expose updated_at.
    // Sentinel value ensures every run re-exports until mtime is available.
    return {
      id: page.slug,
      title: page.title,
      url: `${this.baseUrl}/${projectId}/-/wikis/${page.slug}`,
      lastEditedAt: new Date(0).toISOString(),
    };
  }
}
