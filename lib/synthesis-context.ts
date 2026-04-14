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
  snapshot_profile?: {
    core_count: number;
    dependency_count: number;
    related_count: number;
    context_edge_count: number;
    has_low_integrity_core: boolean;
    max_dependency_depth: number;
    context_class: "rich_graph" | "dependency_only" | "related_only" | "sparse";
  };
  
  topology_signature?: {
    high_score_count: number;
    borderline_count: number;
    best_borderline_score: number;
    gap_detected: boolean;
  };

  advisory?: {
    topology_status: "STABLE_AT_A" | "RECOVERABLE" | "ISOLATED";
    recommended_policy: "A" | "B";
    reason: string;
  };

  decision_confidence?: "HIGH" | "MEDIUM" | "LOW";
  decision_basis?: {
    topology_status: string;
    count_at_0_3: number;
    count_at_0_22: number;
    borderline_count: number;
    best_score: number;
    threshold_used: number;
    related_limit_used: number;
    decision_confidence: number;
    decision_guards: {
        diversity_denied: boolean;
        integrity_denied: boolean;
        hysteresis_applied: boolean;
        violations: string[];
    };
    outcome_metrics: {
        source_diversity: number;
        avg_integrity_score: number;
        noise_signal: "LOW" | "MEDIUM" | "HIGH";
    };
    economics_metrics?: {
        token_usage: number;
        est_review_complexity: number; // 0-1 score
        context_density: number; // nodes per token
    };
    pilot_evaluation?: {
        trust_level: "AUTO_ACCEPT" | "HUMAN_REVIEW" | "REJECT";
        post_review_verdict: "UNREVIEWED" | "CORRECT" | "MINOR_ISSUE" | "MAJOR_ISSUE";
        reason: string;
    };
  };

  decision_guards?: {
    allow_policy_b: boolean;
    violations: string[];
  };

  outcome_metrics?: {
    source_diversity: number; // Category count
    avg_integrity_score: number; // 0.0 ~ 1.0 based on bands
    noise_signal: "LOW" | "MEDIUM" | "HIGH";
  };
  recommended_model?: "haiku" | "sonnet" | "undecided";
  recommendation_status?: "applied" | "undecided" | "not_applicable";
  applied_model?: "haiku" | "sonnet";
  model_policy_reason?: string;
  batch_id?: string;
  wave_id?: number;
  synthesis_code_hash?: string;
}

export interface SynthesisPolicy {
  name: string;
  score_threshold: number;
  related_limit: number;
  max_dependency_depth: number;
}

export const DEFAULT_POLICY_A: SynthesisPolicy = {
  name: "A",
  score_threshold: 0.3,
  related_limit: 3,
  max_dependency_depth: 2
};

export const EXPERIMENTAL_POLICY_B: SynthesisPolicy = {
  name: "B",
  score_threshold: 0.22,
  related_limit: 5,
  max_dependency_depth: 2
};

export interface SynthesisContext {
  coreTopics: GraphNode[];
  dependencies: GraphNode[];
  relatedContext: GraphNode[];
  contextEdges: GraphEdge[];
  warnings: string[];
}

export class SynthesisContextBuilder {
  constructor(private queryEngine: KnowledgeQueryEngine) {}

  public buildContext(topicSlug: string, policy: SynthesisPolicy = DEFAULT_POLICY_A): { context: SynthesisContext, audit: SynthesisAudit } {
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
      
      // Normalize topic slug to whatever the engine resolved (in case of title Fallback UX)
      const trueSlug = coreNode.slug;

      // New: Probe Topology
      const probe = this.probeTopology(trueSlug);
      audit.topology_signature = probe.signature;
      audit.advisory = probe.advisory;
      audit.decision_confidence = probe.confidence;
      audit.decision_basis = {
          topology_status: probe.advisory.topology_status,
          count_at_0_3: probe.signature.high_score_count,
          count_at_0_22: probe.signature.high_score_count + probe.signature.borderline_count,
          borderline_count: probe.signature.borderline_count,
          best_score: probe.signature.best_borderline_score,
          threshold_used: policy.score_threshold,
          related_limit_used: policy.related_limit
      };

      // Guard Layer (for RECOVERABLE switch)
      if (probe.advisory.recommended_policy === "B") {
          const guards = this.applyDecisionGuards(probe.signature.borderline_neighbors || []);
          audit.decision_guards = guards;
          if (!guards.allow_policy_b) {
              // Override recommendation
              audit.advisory.recommended_policy = "A";
              audit.advisory.reason += ` | [GUARD DENIED] ${guards.violations.join(", ")}`;
              audit.decision_confidence = "LOW";
          }
      }

      // 1. Core Selection
      context.coreTopics.push(coreNode);
      audit.selected_core_count++;
      if (coreNode.integrity_band === "LOW") {
          context.warnings.push(`Core topic ${trueSlug} has LOW integrity.`);
      }

      // 2. Dependencies Flattening & Gating
      const rawPaths = this.queryEngine.getDependencyChain(trueSlug, policy.max_dependency_depth);
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
      const rawRelated = this.queryEngine.rankRelated(trueSlug, 20); // fetch more to allow for filtering
      for (const rel of rawRelated) {
          const node = rel.node;
          
          if (node.slug === trueSlug || context.dependencies.some(d => d.slug === node.slug)) {
               audit.dropped_duplicate_nodes.push(node.slug);
               continue;
          }

          if (node.integrity_band === "LOW") {
              audit.dropped_low_integrity_nodes.push(node.slug);
              continue;
          }

          if (rel.score < policy.score_threshold) {
              audit.dropped_below_score_nodes.push(node.slug);
              continue;
          }
          
          // Require confidence >= medium
          const confidence = this.queryEngine.getNeighbors(trueSlug).find(e => 
              (e.source === trueSlug && e.target === node.slug) || 
              (e.bidirectional && e.target === trueSlug && e.source === node.slug)
          )?.confidence;

          if (confidence === "low") {
               audit.dropped_below_score_nodes.push(`${node.slug} (confidence: low)`);
               continue;
          }

          if (context.relatedContext.length < policy.related_limit) {
              context.relatedContext.push(node);
          }
      }
      audit.selected_related_count = context.relatedContext.length;

      // 4. Edge Pruning
      const selectedSlugs = new Set([
          trueSlug,
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

      // Calculate max depth of chosen dependencies
      let maxDepDepth = 0;
      context.dependencies.forEach(d => {
          const depthMeta = flattenedDeps.get(d.slug)?.depth || 0;
          if (depthMeta > maxDepDepth) maxDepDepth = depthMeta;
      });

      // Context Classifier
      let contextClass: "rich_graph" | "dependency_only" | "related_only" | "sparse" = "sparse";
      if (context.dependencies.length > 0 && context.relatedContext.length > 0) {
          contextClass = "rich_graph";
      } else if (context.dependencies.length > 0) {
          contextClass = "dependency_only";
      } else if (context.relatedContext.length > 0) {
          contextClass = "related_only";
      }

      audit.snapshot_profile = {
          core_count: context.coreTopics.length,
          dependency_count: context.dependencies.length,
          related_count: context.relatedContext.length,
          context_edge_count: context.contextEdges.length,
          has_low_integrity_core: context.coreTopics.some(c => c.integrity_band === "LOW"),
          max_dependency_depth: maxDepDepth,
          context_class: contextClass
      };

      // Outcome Metrics Calculation
      const categories = new Set([
          ...context.coreTopics.map(n => n.category),
          ...context.dependencies.map(n => n.category),
          ...context.relatedContext.map(n => n.category)
      ]);
      const integrityMap: Record<string, number> = { "HIGH": 1, "MEDIUM": 0.5, "LOW": 0.1, "unknown": 0 };
      const allNodes = [...context.coreTopics, ...context.dependencies, ...context.relatedContext];
      const avgIntegrity = allNodes.length > 0 ? allNodes.reduce((acc, n) => acc + (integrityMap[n.integrity_band || "unknown"]), 0) / allNodes.length : 0;

      audit.outcome_metrics = {
          source_diversity: categories.size,
          avg_integrity_score: avgIntegrity,
          noise_signal: avgIntegrity < 0.4 ? "HIGH" : (avgIntegrity < 0.7 ? "MEDIUM" : "LOW")
      };

      // 6. Trust Calibration (Phase 4.9)
      const bestScore = audit.decision_basis?.best_score || 0;
      const deniedByGuard = audit.decision_guards?.allow_policy_b === false;

      let trustLevel: "AUTO_ACCEPT" | "HUMAN_REVIEW" | "REJECT" = "HUMAN_REVIEW";
      let trustReason = "";

      if (audit.advisory?.topology_status === "STABLE_AT_A" && bestScore >= 0.5 && avgIntegrity >= 0.8 && !deniedByGuard) {
          trustLevel = "AUTO_ACCEPT";
          trustReason = "Stable topology with high score and integrity.";
      } else if (audit.advisory?.topology_status === "ISOLATED" && context.coreTopics.some(c => c.integrity_band === "LOW")) {
          trustLevel = "REJECT";
          trustReason = "Isolated topology with low integrity core topic.";
      } else {
          trustLevel = "HUMAN_REVIEW";
          trustReason = "Uncertain topology or borderline metrics - Manual calibration needed.";
          if (deniedByGuard) trustReason = "Decision Guard intervention triggered - Manual review mandatory.";
      }

      if (audit.decision_basis) {
          audit.decision_basis.pilot_evaluation = {
              trust_level: trustLevel,
              post_review_verdict: "UNREVIEWED",
              reason: trustReason
          };
      }

      audit.recommended_model = "undecided";
      audit.recommendation_status = "undecided";
      audit.applied_model = "haiku";
      audit.model_policy_reason = "Production Policy v1: Haiku-only due to graph density ceiling";

      return { context, audit };
  }

  public probeTopology(trueSlug: string): { 
      signature: Required<SynthesisAudit>["topology_signature"], 
      advisory: Required<SynthesisAudit>["advisory"],
      confidence: Required<SynthesisAudit>["decision_confidence"]
  } {
      const allNeighbors = this.queryEngine.rankRelated(trueSlug, 50); // Broad probe
      
      const high_score_count = allNeighbors.filter(n => n.score >= 0.3).length;
      const borderline_neighbors = allNeighbors.filter(n => n.score >= 0.22 && n.score < 0.3);
      const borderline_count = borderline_neighbors.length;
      const best_borderline_score = borderline_neighbors.length > 0 ? Math.max(...borderline_neighbors.map(n => n.score)) : 0;
      const gap_detected = high_score_count < 2 && borderline_count === 0;

      const signature = {
          high_score_count,
          borderline_count,
          best_borderline_score,
          gap_detected
      };

      let topology_status: "STABLE_AT_A" | "RECOVERABLE" | "ISOLATED" = "ISOLATED";
      let recommended_policy: "A" | "B" = "A";
      let confidence: "HIGH" | "MEDIUM" | "LOW" = "MEDIUM";
      let reason = "";

      if (high_score_count >= 2) {
          topology_status = "STABLE_AT_A";
          recommended_policy = "A";
          confidence = high_score_count > 2 ? "HIGH" : "MEDIUM";
          reason = `Baseline threshold (0.3) already yielded ${high_score_count} nodes. Lowering threshold is likely unnecessary noise.`;
      } else if (borderline_count > 0) {
          topology_status = "RECOVERABLE";
          // Hysteresis Guard: Require at least 2 borderline nodes to recommend Policy B
          if (borderline_count >= 2) {
              recommended_policy = "B";
              confidence = (borderline_count >= 3 && best_borderline_score > 0.25) ? "HIGH" : "MEDIUM";
              reason = `Found meaningful gain (${borderline_count} nodes, best: ${best_borderline_score.toFixed(2)}). Policy B recommended for better depth.`;
          } else {
              recommended_policy = "A";
              confidence = "LOW";
              reason = `Found 1 borderline node, but insufficient for stable policy switch (Hysteresis Safety). Staying with Policy A.`;
          }
      } else {
          topology_status = "ISOLATED";
          recommended_policy = "A";
          confidence = "HIGH";
          reason = `No context found in the 0.22-0.3 window. Lowering threshold won't resolve this topology gap.`;
      }

      return { 
          signature: { ...signature, borderline_neighbors }, 
          advisory: { topology_status, recommended_policy, reason },
          confidence
      };
  }

  private applyDecisionGuards(borderline: any[]): Required<SynthesisAudit>["decision_guards"] {
      const violations: string[] = [];
      
      // Guard 1: Source Diversity (Categories)
      const categories = new Set(borderline.map(n => n.node.category));
      if (categories.size < 2 && borderline.length > 2) {
          violations.push("Low Category Diversity (Cluster Overfit Risk)");
      }

      // Guard 2: Integrity Balance
      const lowIntegrityCount = borderline.filter(n => n.node.integrity_band === "LOW").length;
      if (lowIntegrityCount / borderline.length > 0.4) {
          violations.push("High Noise Ratio (Excessive LOW integrity nodes in recovery window)");
      }

      return {
          allow_policy_b: violations.length === 0,
          violations
      };
  }
}
