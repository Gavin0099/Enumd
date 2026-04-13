export interface EdgeBasis {
  kind: "explicit_link" | "tag_overlap" | "same_domain" | "authority_hint";
  weight: number;
  details?: any; // e.g. shared_tags, matched_text
}

export interface GraphEdge {
  source: string; // slug
  target: string; // slug
  type: "explicit_ref" | "tag_related" | "same_domain" | "related_to"; // strict observation-grade or low-level interpreted
  confidence: "high" | "medium" | "low";
  score: number; // 0.0 ~ 1.0 continuous score for ranking
  basis: EdgeBasis[];
  bidirectional: boolean;
  generated_at: string;
}

export interface GraphNode {
  id: string; // Notion or document ID
  slug: string;
  title: string;
  path: string; // relative path within docs/ e.g., hub/hub-firmware.md
  category: string;
  domain_tags: string[];
  task_tags: string[];
  authority_level: string;
  notion_id: string;
  notion_updated_at?: string;
  exported_at?: string;
  integrity_band?: "HIGH" | "MEDIUM" | "LOW";
}

export interface GraphAnomaly {
  type: "hub_explosion" | "orphaned_cluster" | "low_signal_edge_cluster";
  node: string;
  degree: number;
}

export interface GraphDiffStats {
  added_edges: number;
  removed_edges: number;
  confidence_shifts: number;
}

export interface GraphBuildReport {
  total_nodes: number;
  total_edges: number;
  edges_by_type: Record<string, number>;
  low_confidence_edges: number;
  orphan_nodes: string[];
  high_degree_nodes: string[];
  edge_anomalies: GraphAnomaly[];
  drift_stats?: GraphDiffStats;
}
