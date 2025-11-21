
import { Suit, TarotCardData } from '../types';

const createCard = (id: number, nameEn: string, name: string, suit: Suit, number: number, keywords: string[], up: string, rev: string): TarotCardData => ({
  id, nameEn, name, suit, number, keywords, meaningUpright: up, meaningReversed: rev
});

// A subset of data for demonstration. In a real production app, this would contain all 78 entries fully detailed.
// I will generate the full deck structure but with concise meanings to fit the context.

export const FULL_DECK_DATA: TarotCardData[] = [
  // --- MAJOR ARCANA ---
  createCard(0, "The Fool", "愚者", Suit.Major, 0, ["開始", "冒險", "純真"], "新的開始，冒險，天真，潛力無限。", "魯莽，冒險失敗，愚蠢，缺乏判斷力。"),
  createCard(1, "The Magician", "魔術師", Suit.Major, 1, ["創造", "力量", "意志"], "展現你的技能，創造力，意志力，資源整合。", "欺騙，操控，技能不熟練，計畫受阻。"),
  createCard(2, "The High Priestess", "女祭司", Suit.Major, 2, ["直覺", "神秘", "潛意識"], "直覺，內在的聲音，智慧，神秘。", "忽視直覺，表面膚淺，秘密被揭穿。"),
  createCard(3, "The Empress", "皇后", Suit.Major, 3, ["豐饒", "母性", "自然"], "富足，創造力，母性，感官享受。", "依賴，創造力受阻，家庭問題，鋪張浪費。"),
  createCard(4, "The Emperor", "皇帝", Suit.Major, 4, ["權威", "結構", "控制"], "領導力，穩定，秩序，父親形象。", "專制，固執，缺乏紀律，濫用權力。"),
  createCard(5, "The Hierophant", "教皇", Suit.Major, 5, ["傳統", "信仰", "學習"], "精神指引，傳統，體制，學習。", "叛逆，挑戰傳統，虛偽的信仰，束縛。"),
  createCard(6, "The Lovers", "戀人", Suit.Major, 6, ["愛情", "選擇", "結合"], "和諧的關係，選擇，價值觀的契合。", "不和諧，錯誤的選擇，關係失衡，分離。"),
  createCard(7, "The Chariot", "戰車", Suit.Major, 7, ["勝利", "意志", "行動"], "決心，勝利，克服障礙，控制力。", "失控，攻擊性，失敗，方向迷失。"),
  createCard(8, "Strength", "力量", Suit.Major, 8, ["勇氣", "耐心", "控制"], "內在力量，勇氣，耐心，以柔克剛。", "軟弱，自我懷疑，缺乏自制，恐懼。"),
  createCard(9, "The Hermit", "隱士", Suit.Major, 9, ["反省", "孤獨", "引導"], "尋求真理，內省，獨處，指導。", "孤立，寂寞，拒絕溝通，迷失。"),
  createCard(10, "Wheel of Fortune", "命運之輪", Suit.Major, 10, ["命運", "轉變", "週期"], "好運，轉折點，命運的循環。", "壞運，抗拒改變，不受控制的事件。"),
  createCard(11, "Justice", "正義", Suit.Major, 11, ["公平", "真理", "因果"], "公正，法律，真相，因果報應。", "不公，偏見，不誠實，逃避責任。"),
  createCard(12, "The Hanged Man", "倒吊人", Suit.Major, 12, ["犧牲", "等待", "新視角"], "換個角度看世界，暫停，犧牲，順其自然。", "無謂的犧牲，停滯不前，自私，掙扎。"),
  createCard(13, "Death", "死神", Suit.Major, 13, ["結束", "重生", "轉變"], "結束是新的開始，徹底的改變，放手。", "抗拒改變，停滯，恐懼結束，衰敗。"),
  createCard(14, "Temperance", "節制", Suit.Major, 14, ["平衡", "調和", "耐心"], "中庸之道，平衡，適度，治癒。", "失衡，極端，缺乏耐心，衝突。"),
  createCard(15, "The Devil", "惡魔", Suit.Major, 15, ["束縛", "慾望", "物質"], "物質主義，上癮，束縛，陰暗面。", "打破束縛，重獲自由，面對恐懼。"),
  createCard(16, "The Tower", "高塔", Suit.Major, 16, ["毀滅", "覺醒", "突變"], "突然的劇變，崩塌，啟示，混亂。", "勉強維持，恐懼改變，避免災難（暫時）。"),
  createCard(17, "The Star", "星星", Suit.Major, 17, ["希望", "靈感", "平靜"], "希望，靈感，療癒，光明的前景。", "失望，缺乏信心，悲觀，失去靈感。"),
  createCard(18, "The Moon", "月亮", Suit.Major, 18, ["幻覺", "恐懼", "潛意識"], "不安，幻想，直覺，潛藏的危險。", "恐懼消退，真相大白，混亂平息。"),
  createCard(19, "The Sun", "太陽", Suit.Major, 19, ["快樂", "成功", "活力"], "積極，成功，溫暖，活力。", "短暫的快樂，過度樂觀，延遲的成功。"),
  createCard(20, "Judgement", "審判", Suit.Major, 20, ["覺醒", "重生", "召喚"], "覺醒，反省，重生的機會，決斷。", "自我懷疑，拒絕改變，悔恨，忽視召喚。"),
  createCard(21, "The World", "世界", Suit.Major, 21, ["完成", "圓滿", "旅行"], "達成目標，圓滿，成就，整合。", "未完成，停滯，缺乏閉環，延遲。"),
];

// Helper to generate minor arcana efficiently
const generateMinors = () => {
  const suits = [
    { s: Suit.Wands, name: "Wands", k: "行動/熱情", u: "行動，靈感，創造力", r: "延遲，缺乏動力" },
    { s: Suit.Cups, name: "Cups", k: "情感/關係", u: "愛，情感，直覺", r: "情感阻礙，情緒化" },
    { s: Suit.Swords, name: "Swords", k: "思想/衝突", u: "理智，溝通，真相", r: "混亂，殘酷，爭執" },
    { s: Suit.Pentacles, name: "Pentacles", k: "物質/工作", u: "財富，實踐，安全感", r: "貪婪，損失，不切實際" },
  ];

  const ranks = [
    "Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", 
    "Page", "Knight", "Queen", "King"
  ];

  let id = 22;
  suits.forEach(suit => {
    ranks.forEach((rank, index) => {
      const num = index + 1;
      const rankName = rank === "Ace" ? "Ace" : (num <= 10 ? num.toString() : rank);
      const cnName = num === 1 ? "Ace" : (num === 11 ? "侍者" : (num === 12 ? "騎士" : (num === 13 ? "皇后" : (num === 14 ? "國王" : num.toString()))));
      
      FULL_DECK_DATA.push(createCard(
        id++,
        `${rank} of ${suit.name}`,
        `${suit.s}${cnName}`,
        suit.s,
        num,
        [suit.k, rankName],
        `${suit.u} - ${rankName} 的能量`,
        `${suit.r} - ${rankName} 的阻礙`
      ));
    });
  });
};

generateMinors();

export const getCardById = (id: number) => FULL_DECK_DATA.find(c => c.id === id);
