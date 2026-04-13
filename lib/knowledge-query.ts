import { readFileSync, existsSync } from "fs";
import { GraphNode, GraphEdge } from "./knowledge-types";

export interface QueryOptions {
    minScore?: number;
    types?: string[];
}

export class KnowledgeQueryEngine {
  private nodes: Map<string, GraphNode> = new Map();
  private edges: GraphEdge[] = [];

  constructor(nodesPath: string, edgesPath: string) {
    if (existsSync(nodesPath)) {
        const parsedNodes = JSON.parse(readFileSync(nodesPath, "utf8")) as GraphNode[];
        parsedNodes.forEach(n => this.nodes.set(n.slug, n));
    }
    if (existsSync(edgesPath)) {
        this.edges = JSON.parse(readFileSync(edgesPath, "utf8")) as GraphEdge[];
    }
  }

  public getNode(slug: string): GraphNode | undefined {
      let node = this.nodes.get(slug);
      if (!node) {
          // Fallback UX: try finding by title instead of slug
          node = Array.from(this.nodes.values()).find(n => n.title.toLowerCase() === slug.toLowerCase());
      }
      return node;
  }

  public getAllEdges(): GraphEdge[] {
      return this.edges;
  }

  public getNeighbors(nodeSlug: string, options?: QueryOptions): GraphEdge[] {
      const minScore = options?.minScore ?? 0.0;
      const validTypes = options?.types;

      return this.edges.filter(edge => {
          const isNeighbor = edge.source === nodeSlug || (edge.target === nodeSlug && edge.bidirectional);
          if (!isNeighbor) return false;
          if (edge.score < minScore) return false;
          if (validTypes && !validTypes.includes(edge.type)) return false;
          return true;
      });
  }

  public rankRelated(nodeSlug: string, limit: number = 5): { node: GraphNode, score: number, type: string }[] {
      const neighbors = this.getNeighbors(nodeSlug);
      
      const related = neighbors.map(edge => {
          const targetSlug = edge.source === nodeSlug ? edge.target : edge.source;
          return {
              node: this.nodes.get(targetSlug)!,
              score: edge.score,
              type: edge.type
          };
      }).filter(r => r.node !== undefined);

      related.sort((a, b) => b.score - a.score);
      
      return related.slice(0, limit);
  }

  public getDependencyChain(nodeSlug: string, maxDepth: number = 3): GraphNode[][] {
      // Stub for multi-hop tracing (e.g. following explicit refs backwards)
      // Uses BFS to find paths.
      const paths: GraphNode[][] = [];
      const queue: { currentSlug: string, path: GraphNode[], depth: number }[] = [];
      
      const startNode = this.nodes.get(nodeSlug);
      if (!startNode) return paths;

      queue.push({ currentSlug: nodeSlug, path: [startNode], depth: 0 });

      while (queue.length > 0) {
          const { currentSlug, path, depth } = queue.shift()!;
          if (depth >= maxDepth) continue;

          // Find dependencies (where target is currentSlug and we depend on source?)
          // or things that currentSlug depends on (source=currentSlug, explicit_ref target)
          // For dependency, let's say "explicit_ref" from current to target means current depends on target.
          
          const deps = this.edges.filter(e => e.source === currentSlug && e.type === "explicit_ref");
          for (const dep of deps) {
              const targetNode = this.nodes.get(dep.target);
              if (targetNode && !path.some(n => n.slug === targetNode.slug)) {
                   const newPath = [...path, targetNode];
                   paths.push(newPath);
                   queue.push({ currentSlug: targetNode.slug, path: newPath, depth: depth + 1 });
              }
          }
      }

      return paths;
  }
}
