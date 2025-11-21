
import { GoogleGenAI, Modality } from "@google/genai";
import { DrawnCard, SpreadType } from "../types";
import { SPREAD_DEFINITIONS } from "../utils/spreadDefinitions";

export const getTarotReading = async (
  cards: DrawnCard[],
  spreadType: SpreadType
): Promise<string> => {
  if (!process.env.API_KEY) {
    return "請設定 API Key 以獲取塔羅解讀。";
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const spreadDef = SPREAD_DEFINITIONS[spreadType];

  const cardsDescription = cards
    .map((c, index) => {
      const positionInfo = spreadDef.positions[index];
      const positionName = positionInfo ? positionInfo.name : `位置 ${index + 1}`;
      const positionDesc = positionInfo ? positionInfo.description : "";
      const orientation = c.isReversed ? "逆位 (Reversed)" : "正位 (Upright)";
      
      return `${index + 1}. [${positionName} - ${positionDesc}] 
         牌名: ${c.name} (${c.nameEn})
         狀態: ${orientation}
         基本牌義: ${c.isReversed ? c.meaningReversed : c.meaningUpright}`;
    })
    .join("\n\n");

  const prompt = `
    你是一位神秘且充滿智慧的資深塔羅占卜師。請為求卜者進行解牌。
    
    **占卜牌陣**：${spreadDef.name}
    **牌陣描述**：${spreadDef.description}
    
    **抽出的牌與位置**：
    ${cardsDescription}
    
    請按照以下結構提供解讀（使用繁體中文）：
    1. **能量總結**：簡短描述這幾張牌共同營造的氛圍或能量流動。
    2. **深入解析**：針對每一張牌，結合其「所在位置的意義」以及「正逆位含義」進行深入解析。請務必解釋為什麼這張牌出現在這個位置代表什麼。
    3. **綜合指引**：根據牌陣的整體結果，給予求卜者一段具體的行動建議或心靈啟發。
    
    語氣要求：神秘、優雅、富有同理心，但不要過於虛無縹緲，要給出實際的洞見。使用 Markdown 格式化輸出。
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });

    return response.text || "星象模糊，無法解讀。請稍後再試。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "與靈界的連結暫時中斷 (API Error)。請檢查網路或稍後再試。";
  }
};

export const editImageWithGemini = async (
  base64Data: string,
  mimeType: string,
  prompt: string
): Promise<string | null> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key not found");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType
            }
          },
          {
            text: prompt
          }
        ]
      },
      config: {
        responseModalities: [Modality.IMAGE],
      }
    });

    const parts = response.candidates?.[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          return part.inlineData.data;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Gemini Image Edit Error:", error);
    throw error;
  }
};
