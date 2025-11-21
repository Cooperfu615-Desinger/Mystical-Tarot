
export enum Suit {
  Wands = "權杖",
  Cups = "聖杯",
  Swords = "寶劍",
  Pentacles = "錢幣",
  Major = "大阿爾卡納"
}

export interface TarotCardData {
  id: number;
  name: string;
  nameEn: string;
  suit: Suit;
  number?: number; // 1-14 for minors, 0-21 for majors
  // Static data for the Library feature
  keywords: string[];
  meaningUpright: string;
  meaningReversed: string;
}

export interface DrawnCard extends TarotCardData {
  isReversed: boolean;
  isRevealed: boolean;
}

export enum SpreadType {
  OneCard = "daily",
  ThreeCard = "time",
  CelticCross = "celtic",
  Love = "love",
  Choice = "choice"
}

export interface SpreadDefinition {
  id: SpreadType;
  name: string;
  description: string;
  cardsCount: number;
  positions: { index: number; name: string; description: string }[];
}

export interface ReadingRecord {
  id: string;
  date: number; // Timestamp
  spreadId: SpreadType;
  spreadName: string;
  cards: DrawnCard[];
  interpretation: string;
  userNotes: string;
}
