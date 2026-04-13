import { GraphNode, GraphEdge, GraphBuildReport } from "./knowledge-types";
import { inferExplicitLinks, inferTagOverlap, inferDomainAffinity, dedupeAndRankEdges } from "./knowledge-inference";

export class KnowledgeGraphBuilder {
  private nodes: GraphNode[] = [];
  private edges: GraphEdge[] = [];

  constructor() {}

  public addNode(node: GraphNode) {
    this.nodes.push(node);
  }

  public getNodes() {
      return this.nodes;
  }

  public getEdges() {
      return this.edges;
  }

  public buildGraph(readMarkdownContent: (path: string) => string) {
    const rawEdges: GraphEdge[] = [];
    
    // Calculate global tag frequencies for tf-idf
    const tagFrequencies: Record<string, number> = {};
    for (const node of this.nodes) {
        for (const tag of node.task_tags || []) {
            tagFrequencies[tag] = (tagFrequencies[tag] || 0) + 1;
        }
    }

    for (const node of this.nodes) {
      const content = readMarkdownContent(node.path);
      rawEdges.push(...inferExplicitLinks(node, this.nodes, content));
      rawEdges.push(...inferTagOverlap(node, this.nodes, tagFrequencies));
      rawEdges.push(...inferDomainAffinity(node, this.nodes));
    }

    this.edges = dedupeAndRankEdges(rawEdges);
  }

  public generateReport(): GraphBuildReport {
    const orphanNodes = this.nodes.filter(n => !this.edges.some(e => e.source === n.slug || e.target === n.slug)).map(n => n.slug);
    
    const degreeCount: Record<string, number> = {};
    for (const edge of this.edges) {
        degreeCount[edge.source] = (degreeCount[edge.source] || 0) + 1;
        degreeCount[edge.target] = (degreeCount[edge.target] || 0) + 1;
    }
    const highDegreeNodes = Object.entries(degreeCount).filter(([_, c]) => c > 10).map(([n]) => n);

    const edge_anomalies: import("./knowledge-types").GraphAnomaly[] = [];
    Object.entries(degreeCount).forEach(([node, degree]) => {
        if (degree > 30) {
            edge_anomalies.push({ type: "hub_explosion", node, degree });
        }
    });

    const edges_by_type: Record<string, number> = {};
    for (const edge of this.edges) {
        edges_by_type[edge.type] = (edges_by_type[edge.type] || 0) + 1;
    }

    return {
      total_nodes: this.nodes.length,
      total_edges: this.edges.length,
      edges_by_type,
      low_confidence_edges: this.edges.filter(e => e.confidence === "low").length,
      orphan_nodes: orphanNodes,
      high_degree_nodes: highDegreeNodes,
      edge_anomalies
    };
  }
}
