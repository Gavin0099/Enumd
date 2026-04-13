/**
 * Knowledge Graph Inference Pipeline
 *
 * Scans markdown files and their corresponding .metadata.json, builds the 
 * advisory knowledge graph, outputs artifacts to /knowledge, and safely 
 * injects the derived relations into the Markdown frontmatter 'relations.inferred', 
 * preserving the manual ones.
 */

import { writeFileSync, readdirSync, existsSync, readFileSync, mkdirSync, statSync } from "fs";
import { join } from "path";
import matter from "gray-matter";
import { GraphNode } from "../lib/knowledge-types";
import { KnowledgeGraphBuilder } from "../lib/knowledge-graph";

const DOCS_DIR = join(process.cwd(), "docs");
const KNOWLEDGE_DIR = join(process.cwd(), "knowledge");

mkdirSync(KNOWLEDGE_DIR, { recursive: true });

function getAllMdFiles(dir: string, fileList: string[] = []): string[] {
    const files = readdirSync(dir);
    for (const file of files) {
        const filePath = join(dir, file);
        if (statSync(filePath).isDirectory()) {
            if (file !== "public" && file !== "images") {
                getAllMdFiles(filePath, fileList);
            }
        } else if (file.endsWith(".md")) {
            fileList.push(filePath);
        }
    }
    return fileList;
}

function processDocs() {
  const builder = new KnowledgeGraphBuilder();
  const mdFiles = getAllMdFiles(DOCS_DIR);

  for (const file of mdFiles) {
    if (file.endsWith("index.md")) continue; // Skip index files

    const metaPath = file.replace(".md", ".metadata.json");
    let signalData: any = {};
    if (existsSync(metaPath)) {
        try {
            signalData = JSON.parse(readFileSync(metaPath, "utf8"));
        } catch (e) {
            console.warn(`Failed to parse metadata for ${file}`);
        }
    }

    const fileContent = readFileSync(file, "utf8");
    const { data: frontmatter } = matter(fileContent);

    // Skip pages with no ID/Slug effectively
    if (!frontmatter.notion_id) continue;

    const slug = file.split(/[\\/]/).pop()?.replace(".md", "") || "";
    const category = file.split(/[\\/]/).slice(-2, -1)[0] || "general";
    
    const sitePathStr = file.substring(DOCS_DIR.length).replace(/^[\\/]+/, '').replace(/\\/g, '/');
    const sitePath = `/${sitePathStr}`.replace(/\.md$/, '.html');

    const node: GraphNode = {
        id: frontmatter.notion_id,
        slug: slug,
        title: frontmatter.title || slug,
        path: file,
        site_path: sitePath,
        category: category,
        domain_tags: frontmatter.domain_tags || [],
        task_tags: frontmatter.task_tags || [],
        authority_level: frontmatter.authority_level || "unknown",
        notion_id: frontmatter.notion_id,
        notion_updated_at: frontmatter.notion_updated_at,
        exported_at: frontmatter.exported_at,
        integrity_band: signalData.metadata?.validation?.integrity_report?.band
    };

    builder.addNode(node);
  }

  console.log(`[build-graph] Loaded ${builder.getNodes().length} nodes. Inferring edges...`);

  builder.buildGraph((path: string) => readFileSync(path, "utf8"));

  const nodes = builder.getNodes();
  const edges = builder.getEdges();
  const report = builder.generateReport();

  // Graph Diff Computation
  let diffStats: import("../lib/knowledge-types").GraphDiffStats = { added_edges: 0, removed_edges: 0, confidence_shifts: 0, score_shifts: 0 };
  const edgesPath = join(KNOWLEDGE_DIR, "edges.json");
  if (existsSync(edgesPath)) {
      const prevEdges = JSON.parse(readFileSync(edgesPath, "utf8")) as import("../lib/knowledge-types").GraphEdge[];
      const prevEdgeIds = new Set(prevEdges.map(e => `${e.source}-${e.target}-${e.type}`));
      const newEdgeIds = new Set(edges.map(e => `${e.source}-${e.target}-${e.type}`));
      
      diffStats.added_edges = [...newEdgeIds].filter(id => !prevEdgeIds.has(id)).length;
      diffStats.removed_edges = [...prevEdgeIds].filter(id => !newEdgeIds.has(id)).length;
      
      let confShifts = 0;
      let scoShifts = 0;
      for (const edge of edges) {
          const prev = prevEdges.find(e => e.source === edge.source && e.target === edge.target && e.type === edge.type);
          if (prev) {
              if (prev.confidence !== edge.confidence) confShifts++;
              if (Math.abs(prev.score - edge.score) >= 0.1) scoShifts++;
          }
      }
      diffStats.confidence_shifts = confShifts;
      diffStats.score_shifts = scoShifts;
  }
  report.drift_stats = diffStats;

  // Export artifacts
  writeFileSync(join(KNOWLEDGE_DIR, "nodes.json"), JSON.stringify(nodes, null, 2));
  writeFileSync(edgesPath, JSON.stringify(edges, null, 2));
  writeFileSync(join(KNOWLEDGE_DIR, "build-report.json"), JSON.stringify(report, null, 2));
  writeFileSync(join(KNOWLEDGE_DIR, "graph_diff.json"), JSON.stringify(diffStats, null, 2));
  console.log(`[build-graph] Graph generated: ${edges.length} edges.`);

  // Write back to Frontmatter safely
  console.log(`[build-graph] Updating frontmatters...`);
  let updatedCount = 0;
  for (const node of nodes) {
      const nodeEdges = edges.filter(e => e.source === node.slug || (e.bidirectional && e.target === node.slug));
      if (nodeEdges.length === 0) continue;

      const fileContent = readFileSync(node.path, "utf8");
      const parsed = matter(fileContent);
      
      const inferredRelations = nodeEdges.map(e => {
          const targetSlug = e.source === node.slug ? e.target : e.source;
          const targetNode = nodes.find(n => n.slug === targetSlug);
          return {
              target: targetSlug,
              title: targetNode?.title || targetSlug,
              path: targetNode?.site_path || '',
              type: e.type,
              confidence: e.confidence,
              score: e.score
          };
      });

      // Initialize if missing
      if (!parsed.data.relations) {
          parsed.data.relations = { manual: [], inferred: [] };
      } else if (Array.isArray(parsed.data.relations)) {
          // Migration from old array
          parsed.data.relations = { manual: parsed.data.relations, inferred: [] };
      }

      parsed.data.relations.inferred = inferredRelations;

      const newContent = matter.stringify(`\n${parsed.content.trim()}\n`, parsed.data);
      writeFileSync(node.path, newContent, "utf8");
      updatedCount++;
  }

  console.log(`[build-graph] Updated relations for ${updatedCount} Markdown files.`);
  console.log(`[build-graph] Done!`);
}

processDocs();
