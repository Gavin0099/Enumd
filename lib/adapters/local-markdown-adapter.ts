import { readdirSync, readFileSync, statSync } from "fs";
import { join, extname, basename } from "path";
import type { KnowledgeSourceAdapter, ListPagesOpts, PageMeta } from "../source-adapter";
import type { ExtractionSignal, SignalCollector } from "../signals";

export class LocalMarkdownAdapter implements KnowledgeSourceAdapter {
  async listPages(opts: ListPagesOpts = {}): Promise<PageMeta[]> {
    if (!opts.rootDir) throw new Error("LocalMarkdownAdapter.listPages: provide rootDir");
    return this._walk(opts.rootDir);
  }

  async getPageContent(id: string): Promise<string> {
    return readFileSync(id, "utf8");
  }

  async getPageContentWithSignal(
    id: string,
    collector: SignalCollector
  ): Promise<{ markdown: string; signal: ExtractionSignal }> {
    const markdown = readFileSync(id, "utf8");
    const signal = collector.getSignal();
    return { markdown, signal };
  }

  async getChildPageIds(_id: string): Promise<string[]> {
    return [];
  }

  private _walk(dir: string): PageMeta[] {
    const results: PageMeta[] = [];
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        results.push(...this._walk(fullPath));
      } else if (entry.isFile() && extname(entry.name) === ".md") {
        const content = readFileSync(fullPath, "utf8");
        results.push({
          id: fullPath,
          title: this._extractTitle(content, entry.name),
          url: `file://${fullPath.replace(/\\/g, "/")}`,
          lastEditedAt: statSync(fullPath).mtime.toISOString(),
        });
      }
    }
    return results;
  }

  private _extractTitle(content: string, filename: string): string {
    const match = content.match(/^#\s+(.+)$/m);
    return match ? match[1].trim() : basename(filename, ".md");
  }
}
