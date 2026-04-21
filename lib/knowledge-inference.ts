import { GraphNode, GraphEdge, EdgeBasis } from "./knowledge-types";

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
      
      // Threshold: Lowering from 1.5 to 1.0 to fill the Threshold Void
      if (score > 1.0) {
          // Allow scores to land more naturally in the 0.22 - 0.5 range
          const normalizedScore = Math.min(score / 4.0, 0.9);
          
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
          const score = Math.min(0.15 + (sharedDomains.length * 0.05), 0.4);
          edges.push({
              source: node.slug,
              target: other.slug,
              type: "same_domain",
              confidence: "low",
              score: score,
              bidirectional: true,
              generated_at: new Date().toISOString(),
              basis: [{
                 kind: "same_domain",
                 weight: score,
                 details: { shared_domains: sharedDomains, target_authority: other.authority_level } 
              }]
          });
      }
  }
  return edges;
}

export function inferTitleSimilarity(node: GraphNode, allNodes: GraphNode[]): GraphEdge[] {
  const edges: GraphEdge[] = [];
  const tokenize = (s: string) => s.toLowerCase().split(/[\s_-]+/).filter(w => w.length > 1);
  const nodeWords = new Set(tokenize(node.title));
  
  if (nodeWords.size === 0) return edges;

  for (const other of allNodes) {
      if (other.slug === node.slug) continue;
      
      const otherWords = tokenize(other.title);
      const intersection = otherWords.filter(w => nodeWords.has(w));
      
      if (intersection.length > 0) {
          const unionSize = new Set([...nodeWords, ...otherWords]).size;
          const jaccard = intersection.length / unionSize;
          
          // Jaccard similarity scaled to 0.0 ~ 0.5 range
          const score = Math.min(jaccard * 1.5, 0.5); 

          if (score > 0.1) {
              edges.push({
                  source: node.slug,
                  target: other.slug,
                  type: "related_to",
                  confidence: "low",
                  score: score,
                  bidirectional: true,
                  generated_at: new Date().toISOString(),
                  basis: [{
                      kind: "authority_hint", // Reusing kind for title matching signal
                      weight: score,
                      details: { reason: "Title similarity", match_count: intersection.length, jaccard }
                  }]
              });
          }
      }
  }
  return edges;
}

export function dedupeAndRankEdges(edges: GraphEdge[]): GraphEdge[] {
  // We need to dedupe directed and undirected edges safely.
  // Group undirected edges by min-max id
  // Group directed edges by explicit source-target id
  // If directed overlaps with undirected, directed keeps its source->target but absorbs undirected basis
  
  const mergedEdges: GraphEdge[] = [];
  
  const undirectedEdges: GraphEdge[] = edges.filter(e => e.bidirectional);
  const directedEdges: GraphEdge[] = edges.filter(e => !e.bidirectional);
  
  const undirectedGroup = new Map<string, GraphEdge[]>();
  const directedGroup = new Map<string, GraphEdge[]>();

  for (const edge of undirectedEdges) {
      const id = edge.source < edge.target ? `${edge.source}|||${edge.target}` : `${edge.target}|||${edge.source}`;
      if (!undirectedGroup.has(id)) undirectedGroup.set(id, []);
      undirectedGroup.get(id)!.push(edge);
  }

  for (const edge of directedEdges) {
      const id = `${edge.source}->${edge.target}`; // STRICT directional
      if (!directedGroup.has(id)) directedGroup.set(id, []);
      directedGroup.get(id)!.push(edge);
  }

  // 1. Process Directed Edges (explicit_refs)
  directedGroup.forEach((edgeList, id) => {
      let finalType: GraphEdge["type"] = "explicit_ref";
      let confidence: GraphEdge["confidence"] = "high";
      let maxScore = 0;
      const allBasis: EdgeBasis[] = [];
      const baseEdge = edgeList[0];
      
      // Pull in any undirected basis that matches A-B
      const undirectedId = baseEdge.source < baseEdge.target ? `${baseEdge.source}|||${baseEdge.target}` : `${baseEdge.target}|||${baseEdge.source}`;
      let combinedList = [...edgeList];
      if (undirectedGroup.has(undirectedId)) {
           combinedList = [...combinedList, ...undirectedGroup.get(undirectedId)!];
           // Do not remove it from undirectedGroup yet, because B->A might also exist and want to absorb it!
      }

      for (const e of combinedList) {
          // ensure basis isn't duplicated accidentally if merged twice, but fine for arrays
          // filter unique basises
          for (const b of e.basis) {
              if (!allBasis.some(existing => existing.kind === b.kind && existing.weight === b.weight)) {
                  allBasis.push(b);
              }
          }
          if (e.score > maxScore) maxScore = e.score;
      }
      
      mergedEdges.push({
          source: baseEdge.source,
          target: baseEdge.target,
          type: finalType,
          confidence,
          score: maxScore,
          bidirectional: false,
          generated_at: new Date().toISOString(),
          basis: allBasis
      });
  });

  // 2. Process Undirected Edges
  undirectedGroup.forEach((edgeList, undirectedId) => {
      // If this group was already absorbed by BOTH a A->B and B->A directed edge, it's fully redundant.
      // Easiest is to still generate the undirected edge IF there are no directed edges covering it?
      // No, if directed A->B exists, is the undirected connection A-B still needed structurally? 
      // If A->B exists, the relationship is established directionally. But B->A is NOT.
      // To strictly preserve Phase 3 integrity:
      // If there's an undirected relation (e.g. tag overlap), it implies B relates to A too.
      // If we only have A->B (explicit), we might still want the undirected edge to exist as a fallback for B->A?
      // Actually, if we keep the undirected edge separate, we risk duplicate output (A->B explicit, A-B undirected).
      // Best approach: If we generated A->B explicit, creating B->A undirected representing the remaining semantic overlap
      // might be complex. Let's merge purely.
      
      const parts = undirectedId.split('|||');
      const src = parts[0];
      const tgt = parts[1];
      
      const hasDirectedAtoB = directedGroup.has(`${src}->${tgt}`);
      const hasDirectedBtoA = directedGroup.has(`${tgt}->${src}`);
      
      // If there are explicit links covering BOTH directions, the undirected relation is fully absorbed.
      if (hasDirectedAtoB && hasDirectedBtoA) {
          return;
      }

      // If neither directed link exists, just create the standard undirected edge
      if (!hasDirectedAtoB && !hasDirectedBtoA) {
          let finalType: GraphEdge["type"] = "same_domain";
          let confidence: GraphEdge["confidence"] = "low";
          let maxScore = 0;
          const allBasis: EdgeBasis[] = [];

          if (edgeList.some(e => e.type === "tag_related")) {
              finalType = "tag_related";
              confidence = "medium";
          }

          for (const e of edgeList) {
             for (const b of e.basis) {
                  if (!allBasis.some(existing => existing.kind === b.kind && existing.weight === b.weight)) {
                      allBasis.push(b);
                  }
              }
              if (e.score > maxScore) maxScore = e.score;
          }

          mergedEdges.push({
              source: src,
              target: tgt,
              type: finalType,
              confidence,
              score: maxScore,
              bidirectional: true,
              generated_at: new Date().toISOString(),
              basis: allBasis
          });
      } else {
          // One directional link exists (e.g. A->B). The undirected relation implies B relates to A (e.g. via tags).
          // We already absorbed the tags into A->B. But B->A is lost if we drop it here!
          // We should create the B->A edge as specifically the undirected leftovers.
          const existingDirSrc = hasDirectedAtoB ? src : tgt;
          const missingDirSrc = hasDirectedAtoB ? tgt : src;
          const missingDirTgt = hasDirectedAtoB ? src : tgt;

          let finalType: GraphEdge["type"] = "same_domain";
          let confidence: GraphEdge["confidence"] = "low";
          let maxScore = 0;
          const allBasis: EdgeBasis[] = [];

          if (edgeList.some(e => e.type === "tag_related")) {
              finalType = "tag_related";
              confidence = "medium";
          }

          for (const e of edgeList) {
              for (const b of e.basis) {
                  if (!allBasis.some(existing => existing.kind === b.kind && existing.weight === b.weight)) {
                      allBasis.push(b);
                  }
              }
              if (e.score > maxScore) maxScore = e.score;
          }

          mergedEdges.push({
              source: missingDirSrc,
              target: missingDirTgt,
              type: finalType, // e.g. tag_related
              confidence,
              score: maxScore,
              bidirectional: false, // Since A->B is explicit, we represent B->A as a generated unidirectional tag relation
              generated_at: new Date().toISOString(),
              basis: allBasis
          });
      }
  });
  
  return mergedEdges;
}
