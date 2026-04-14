import { readFileSync, existsSync } from "fs";
import matter from "gray-matter";
import { SynthesisContext, SynthesisAudit } from "./synthesis-context";
import { GraphNode } from "./knowledge-types";

export class PromptAssembler {
    private buildNodeXml(tag: string, node: GraphNode): string {
        if (!node.path || !existsSync(node.path)) {
            return `<${tag} id="${node.slug}" title="${node.title}" path="${node.site_path || node.path}">[CONTENT NOT FOUND]</${tag}>`;
        }
        
        try {
            const rawContent = readFileSync(node.path, "utf-8");
            const { content } = matter(rawContent);
            // Minimal truncation logic to defend against extremely large files blowing up context unexpectedly
            const safeContent = content.length > 50000 ? content.substring(0, 50000) + "\n...[TRUNCATED]" : content;
            return `<${tag} id="${node.slug}" title="${node.title}" path="${node.site_path || node.path}">\n${safeContent}\n</${tag}>`;
        } catch(e: any) {
            return `<${tag} id="${node.slug}" title="${node.title}">[ERROR READING CONTENT: ${e.message}]</${tag}>`;
        }
    }

    public buildPromptParameters(context: SynthesisContext, audit: SynthesisAudit): { systemInstruction: string, contextPrompt: string } {
        let xmlBuilder = `<context_boundaries>\n`;
        
        // 1. Core Topics
        context.coreTopics.forEach(node => {
            xmlBuilder += this.buildNodeXml("core_topic", node) + "\n";
        });

        // 2. Dependencies
        if (context.dependencies.length > 0) {
            xmlBuilder += `  <dependencies>\n`;
            context.dependencies.forEach(node => {
                 xmlBuilder += `    ` + this.buildNodeXml("dependency", node).replace(/\n/g, "\n    ") + "\n";
            });
            xmlBuilder += `  </dependencies>\n`;
        }

        // 3. Related Context
        if (context.relatedContext.length > 0) {
            xmlBuilder += `  <related_context>\n`;
            context.relatedContext.forEach(node => {
                 xmlBuilder += `    ` + this.buildNodeXml("related", node).replace(/\n/g, "\n    ") + "\n";
            });
            xmlBuilder += `  </related_context>\n`;
        }

        xmlBuilder += `</context_boundaries>`;

        let systemInstruction = `You are the Enumd Evidence Kernel Synthesis Engine.
Your primary directive is ZERO HALLUCINATION.

RULES:
1. Synthesize knowledge strictly from the <context_boundaries> provided.
2. Formulate your output as a comprehensive Markdown report.
3. Every borrowed concept, code snippet, or logic MUST be cited inline using the format: \`[Title](path)\` corresponding to the provided XML node attributes.
4. You must explicitly highlight the relationships connecting the Core Topic with the provided dependencies and related context.
5. If the provided context is insufficient to answer a broader concept, explicitly state that the evidence kernel lacks this data. Do NOT invent concepts outside the provided graphs.
6. Only use traditional Chinese (zh-TW) for your synthesis output, except for technical terms, variable names, and file paths which MUST remain in English.`;

        if (audit.snapshot_profile?.context_class === "sparse") {
            systemInstruction = `You are the Enumd Evidence Kernel Synthesis Engine.
Your primary directive is ZERO HALLUCINATION.

RULES:
1. You are running in SPARSE GRAPH FALLBACK MODE.
2. Formulate a VERY SHORT SUMMARY (2-3 sentences max) based ONLY on the Core Topic text. Do not attempt a comprehensive synthesis.
3. YOU MUST INCLUDE THIS EXACT DISCLAIMER at the top of your response: "⚠️ 此頁圖譜上下文不足，摘要僅根據單一核心節點生成。"
4. Do not invent context. Stay extremely concise.
5. Only use traditional Chinese (zh-TW) for your synthesis output, except for technical terms.`;
        }

        return { systemInstruction, contextPrompt: xmlBuilder };
    }
}
