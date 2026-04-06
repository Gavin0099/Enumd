import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `你是技術文件整理專家。請將以下 Notion 頁面內容重新整理成結構清晰的技術 Markdown 文件。

規則：
1. 保留所有技術細節、指令、參數、錯誤訊息、步驟流程
2. 去除多餘的格式符號、重複內容、無意義空行
3. 用 ## 和 ### 作為分節標題，便於快速查閱
4. 若有指令或程式碼，保留完整並用 code block 包住
5. 保持原文語言（中文維持中文，英文維持英文）
6. 輸出長度控制在原文 80% 以內
7. 不要加前言（如「以下是整理結果」）或後記

直接輸出整理後的 Markdown 內容。`;

export async function summarizePage(title: string, content: string): Promise<string> {
  if (content.length < 200) return content;

  try {
    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `頁面標題：${title}\n\n原始內容：\n${content}`,
        },
      ],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : content;
    return text.trim() || content;
  } catch (err) {
    console.warn(`  [summarize] failed for "${title}":`, (err as Error).message);
    return content;
  }
}
