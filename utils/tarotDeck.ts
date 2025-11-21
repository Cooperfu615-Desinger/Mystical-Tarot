
import { DrawnCard } from '../types';
import { FULL_DECK_DATA } from './tarotData';

// Re-export to maintain compatibility if needed, but mostly we use FULL_DECK_DATA now
export const generateDeck = () => FULL_DECK_DATA;

export const shuffleAndDraw = (count: number): DrawnCard[] => {
  // Create a shallow copy to shuffle
  const deck = [...FULL_DECK_DATA];
  
  // Fisher-Yates Shuffle
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  const selected = deck.slice(0, count);
  
  return selected.map(card => ({
    ...card,
    isReversed: Math.random() < 0.3, // 30% chance of reversal
    isRevealed: false
  }));
};
