import { GraphNode, GraphEdge } from "./knowledge-types";
import { KnowledgeQueryEngine } from "./knowledge-query";

export interface SynthesisAudit {
  requested_slug: string;
  selected_core_count: number;
  selected_dependency_count: number;
  selected_related_count: number;
  dropped_low_integrity_nodes: string[];
  dropped_duplicate_nodes: string[];
  dropped_below_score_nodes: string[];
  total_context_edges: number;
}

export interface SynthesisContext {
  coreTopics: GraphNode[];
  dependencies: GraphNode[];
  relatedContext: GraphNode[];
  contextEdges: GraphEdge[];
  warnings: string[];
}

export class SynthesisContextBuilder {
  constructor(private queryEngine: KnowledgeQueryEngine) {}

  public buildContext(topicSlug: string, maxDepth: number = 2): { context: SynthesisContext, audit: SynthesisAudit } {
      const context: SynthesisContext = {
          coreTopics: [],
          dependencies: [],
          relatedContext: [],
          contextEdges: [],
          warnings: []
      };

      const audit: SynthesisAudit = {
          requested_slug: topicSlug,
          selected_core_count: 0,
          selected_dependency_count: 0,
          selected_related_count: 0,
          dropped_low_integrity_nodes: [],
          dropped_duplicate_nodes: [],
          dropped_below_score_nodes: [],
          total_context_edges: 0
      };

      const coreNode = this.queryEngine.getNode(topicSlug);
      if (!coreNode) {
          context.warnings.push(`Core topic ${topicSlug} not found in the graph.`);
          return { context, audit };
      }

      // 1. Core Selection
      context.coreTopics.push(coreNode);
      audit.selected_core_count++;
      if (coreNode.integrity_band === "LOW") {
          context.warnings.push(`Core topic ${topicSlug} has LOW integrity.`);
      }

      // 2. Dependencies Flattening & Gating
      const rawPaths = this.queryEngine.getDependencyChain(topicSlug, maxDepth);
      const flattenedDeps = new Map<string, { node: GraphNode, depth: number }>();
      
      for (const path of rawPaths) {
          const depth = path.length - 1;
          const targetDep = path[path.length - 1];
          if (!flattenedDeps.has(targetDep.slug)) {
              flattenedDeps.set(targetDep.slug, { node: targetDep, depth });
          } else {
              if (depth < flattenedDeps.get(targetDep.slug)!.depth) {
                  flattenedDeps.set(targetDep.slug, { node: targetDep, depth }); // keep shortest depth
              }
          }
      }

      const depList = Array.from(flattenedDeps.values());
      // Stable sort: short depth, HIGH > MEDIUM > LOW, lexical fallback
      const integrityRank: Record<string, number> = { "HIGH": 3, "MEDIUM": 2, "LOW": 1, "unknown": 0 };
      depList.sort((a, b) => {
          if (a.depth !== b.depth) return a.depth - b.depth;
          const aRank = integrityRank[a.node.integrity_band || "unknown"];
          const bRank = integrityRank[b.node.integrity_band || "unknown"];
          if (aRank !== bRank) return bRank - aRank; // Higher first
          return a.node.title.localeCompare(b.node.title);
      });

      for (const { node } of depList) {
          // Cannot overlap core
          if (node.slug === topicSlug) {
              // Already dropped
              continue;
          }
          
          if (node.integrity_band === "LOW") {
              audit.dropped_low_integrity_nodes.push(node.slug);
              continue;
          }

          context.dependencies.push(node);
      }
      audit.selected_dependency_count = context.dependencies.length;

      // 3. RelatedContext Selection
      const rawRelated = this.queryEngine.rankRelated(topicSlug, 20); // fetch more to allow for filtering
      for (const rel of rawRelated) {
          const node = rel.node;
          
          if (node.slug === topicSlug || context.dependencies.some(d => d.slug === node.slug)) {
               audit.dropped_duplicate_nodes.push(node.slug);
               continue;
          }

          if (node.integrity_band === "LOW") {
              audit.dropped_low_integrity_nodes.push(node.slug);
              continue;
          }

          if (rel.score < 0.3) {
              audit.dropped_below_score_nodes.push(node.slug);
              continue;
          }
          
          // Require confidence >= medium
          const confidence = this.queryEngine.getNeighbors(topicSlug).find(e => 
              (e.source === topicSlug && e.target === node.slug) || 
              (e.bidirectional && e.target === topicSlug && e.source === node.slug)
          )?.confidence;

          if (confidence === "low") {
               audit.dropped_below_score_nodes.push(`${node.slug} (confidence: low)`);
               continue;
          }

          if (context.relatedContext.length < 3) {
              context.relatedContext.push(node);
          }
      }
      audit.selected_related_count = context.relatedContext.length;

      // 4. Edge Pruning
      const selectedSlugs = new Set([
          topicSlug,
          ...context.dependencies.map(d => d.slug),
          ...context.relatedContext.map(r => r.slug)
      ]);

      const allEdges = this.queryEngine.getAllEdges();
      for (const edge of allEdges) {
          if (selectedSlugs.has(edge.source) && selectedSlugs.has(edge.target)) {
               context.contextEdges.push(edge);
          }
      }
      audit.total_context_edges = context.contextEdges.length;

      // Dangling Check
      if (context.contextEdges.length === 0 && selectedSlugs.size > 1) {
          context.warnings.push("WARNING: Selected nodes produced 0 context edges. Subgraph is completely disjointed except for implicit associations.");
      }

      return { context, audit };
  }
}
