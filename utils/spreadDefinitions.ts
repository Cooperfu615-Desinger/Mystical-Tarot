
import { SpreadType, SpreadDefinition } from '../types';

export const SPREAD_DEFINITIONS: Record<SpreadType, SpreadDefinition> = {
  [SpreadType.OneCard]: {
    id: SpreadType.OneCard,
    name: "每日單張指引",
    description: "抽取一張牌，獲得當下的靈感與建議，適合日常占卜。",
    cardsCount: 1,
    positions: [
      { index: 0, name: "當下指引", description: "問題的核心或當下的能量" }
    ]
  },
  [SpreadType.ThreeCard]: {
    id: SpreadType.ThreeCard,
    name: "時間之流牌陣",
    description: "經典的過去、現在、未來牌陣，探索事情的發展脈絡。",
    cardsCount: 3,
    positions: [
      { index: 0, name: "過去", description: "導致當前情況的原因" },
      { index: 1, name: "現在", description: "目前的情況與挑戰" },
      { index: 2, name: "未來", description: "依照目前趨勢的發展" }
    ]
  },
  [SpreadType.Choice]: {
    id: SpreadType.Choice,
    name: "二擇一牌陣",
    description: "當你面臨兩個選擇猶豫不決時，分析兩個選項的結果。",
    cardsCount: 5,
    positions: [
      { index: 0, name: "現況", description: "你目前的狀態" },
      { index: 1, name: "選擇A", description: "選擇 A 的過程或狀況" },
      { index: 2, name: "選擇A結果", description: "選擇 A 的潛在結果" },
      { index: 3, name: "選擇B", description: "選擇 B 的過程或狀況" },
      { index: 4, name: "選擇B結果", description: "選擇 B 的潛在結果" }
    ]
  },
  [SpreadType.Love]: {
    id: SpreadType.Love,
    name: "愛情關係牌陣",
    description: "深入分析雙方的關係狀態、彼此的想法與阻礙。",
    cardsCount: 4,
    positions: [
      { index: 0, name: "你的看法", description: "你對這段關係的看法" },
      { index: 1, name: "對方的看法", description: "對方對這段關係的看法" },
      { index: 2, name: "阻礙/挑戰", description: "目前關係中的主要問題" },
      { index: 3, name: "關係結果", description: "這段關係的走向建議" }
    ]
  },
  [SpreadType.CelticCross]: {
    id: SpreadType.CelticCross,
    name: "凱爾特十字",
    description: "最古老且完整的牌陣，全方位分析問題的深層原因與未來。",
    cardsCount: 10,
    positions: [
      { index: 0, name: "現況", description: "核心問題" },
      { index: 1, name: "阻礙", description: "阻擋你的力量（橫放）" },
      { index: 2, name: "潛意識", description: "內在的渴望或恐懼" },
      { index: 3, name: "過去", description: "剛發生的事件" },
      { index: 4, name: "意識", description: "你的目標或已知想法" },
      { index: 5, name: "未來", description: "即將發生的事" },
      { index: 6, name: "自我", description: "你的態度" },
      { index: 7, name: "環境", description: "周遭人事物的影響" },
      { index: 8, name: "希望/恐懼", description: "內心深處的期待或焦慮" },
      { index: 9, name: "最終結果", description: "問題的最終解答" }
    ]
  }
};
