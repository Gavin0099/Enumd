import { GraphNode, GraphEdge } from "./knowledge-types";

// Helper for unique string IDs in edges
const edgeId = (src: string, tgt: string) => src < tgt ? `${src}-${tgt}` : `${tgt}-${src}`;

export function inferExplicitLinks(node: GraphNode, allNodes: GraphNode[], markdownContent: string): GraphEdge[] {
  const edges: GraphEdge[] = [];
  // Match markdown relative links e.g. [text](./slug) or [text](../category/slug)
  const linkRegex = /\[.*?\]\((?:\.\/|\.\.\/.*?\/)([a-zA-Z0-9_-]+)\)/g;
  let match;
  
  while ((match = linkRegex.exec(markdownContent)) !== null) {
      const targetSlug = match[1];
      if (targetSlug === node.slug) continue; // ignore self-links
      
      const targetNode = allNodes.find(n => n.slug === targetSlug);
      if (targetNode) {
          edges.push({
              source: node.slug,
              target: targetNode.slug,
              type: "explicit_ref",
              confidence: "high",
              score: 1.0,
              bidirectional: false,
              generated_at: new Date().toISOString(),
              basis: [{
                  kind: "explicit_link",
                  weight: 1.0,
                  details: { matched_slug: targetSlug }
              }]
          });
      }
  }
  return edges;
}

export function inferTagOverlap(node: GraphNode, allNodes: GraphNode[], tagFrequencies: Record<string, number>): GraphEdge[] {
  const edges: GraphEdge[] = [];
  const TOTAL_DOCS = allNodes.length;
  
  for (const other of allNodes) {
      if (other.slug === node.slug) continue;
      
      const sharedTags = node.task_tags.filter(t => other.task_tags.includes(t));
      if (sharedTags.length === 0) continue;
      
      // Calculate a TF-IDF style score
      // IDF = log(N / df)
      let score = 0;
      for (const tag of sharedTags) {
          const df = tagFrequencies[tag] || 1;
          // smooth idf
          score += Math.log((TOTAL_DOCS + 1) / (df + 1));
      }
      
      // Threshold: needs arbitrary tuning. Let's say score > 1.5 is a valid edge
      if (score > 1.5) {
          // Normalize score to 0.0 ~ 0.9 range (tags never reach 1.0 like explicit links)
          const normalizedScore = Math.min(score / 5.0, 0.9);
          
          edges.push({
              source: node.slug,
              target: other.slug,
              type: "tag_related",
              confidence: "medium",
              score: normalizedScore,
              bidirectional: true, // Tag overlap is naturally bidirectional
              generated_at: new Date().toISOString(),
              basis: [{
                  kind: "tag_overlap",
                  weight: normalizedScore,
                  details: { shared_tags: sharedTags, raw_score: score }
              }]
          });
      }
  }
  return edges;
}

export function inferDomainAffinity(node: GraphNode, allNodes: GraphNode[]): GraphEdge[] {
  const edges: GraphEdge[] = [];
  
  for (const other of allNodes) {
      if (other.slug === node.slug) continue;
      
      const sharedDomains = node.domain_tags.filter(d => other.domain_tags.includes(d));
      if (sharedDomains.length > 0) {
          edges.push({
              source: node.slug,
              target: other.slug,
              type: "same_domain",
              confidence: "low",
              score: 0.2, // Base minimum score
              bidirectional: true,
              generated_at: new Date().toISOString(),
              basis: [{
                 kind: "same_domain",
                 weight: 0.2,
                 details: { shared_domains: sharedDomains, target_authority: other.authority_level } 
              }]
          });
      }
  }
  return edges;
}

export function dedupeAndRankEdges(edges: GraphEdge[]): GraphEdge[] {
  // Group by src-tgt pair
  const grouped = new Map<string, GraphEdge[]>();
  
  for (const edge of edges) {
      const id = edgeId(edge.source, edge.target);
      if (!grouped.has(id)) grouped.set(id, []);
      grouped.get(id)!.push(edge);
  }
  
  const merged: GraphEdge[] = [];
  grouped.forEach((edgeList, id) => {
      let finalType: GraphEdge["type"] = "same_domain";
      let confidence: GraphEdge["confidence"] = "low";
      let maxScore = 0;
      const allBasis = [];
      let isBidirectional = true; 
      
      const hasExplicit = edgeList.some(e => e.type === "explicit_ref");
      const hasTag = edgeList.some(e => e.type === "tag_related");
      
      if (hasExplicit) {
          finalType = "explicit_ref";
          confidence = "high";
          isBidirectional = false; // Explicit links are directional
      } else if (hasTag) {
          finalType = "tag_related";
          confidence = "medium";
      }
      
      for (const e of edgeList) {
          allBasis.push(...e.basis);
          if (e.score > maxScore) maxScore = e.score;
      }
      
      const baseEdge = edgeList.find(e => e.type === "explicit_ref") || edgeList[0];
      
      merged.push({
          source: baseEdge.source,
          target: baseEdge.target,
          type: finalType,
          confidence,
          score: maxScore,
          bidirectional: isBidirectional,
          generated_at: new Date().toISOString(),
          basis: allBasis
      });
  });
  
  return merged;
}
