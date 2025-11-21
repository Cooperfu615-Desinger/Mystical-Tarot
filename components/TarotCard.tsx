import React from 'react';
import { DrawnCard, Suit } from '../types';

interface TarotCardProps {
  card: DrawnCard;
  index: number;
  onReveal: (index: number) => void;
}

const TarotCard: React.FC<TarotCardProps> = ({ card, index, onReveal }) => {
  
  const getSuitIcon = (suit: Suit) => {
    switch (suit) {
      case Suit.Cups: return "🏆";
      case Suit.Wands: return "🪄";
      case Suit.Swords: return "⚔️";
      case Suit.Pentacles: return "🪙";
      case Suit.Major: return "🔮";
      default: return "✨";
    }
  };

  return (
    <div 
      className="relative w-48 h-80 cursor-pointer perspective-1000 mx-auto mb-8 md:mb-0"
      onClick={() => !card.isRevealed && onReveal(index)}
    >
      <div 
        className={`relative w-full h-full duration-700 preserve-3d transition-transform ${
          card.isRevealed ? 'rotate-y-180' : ''
        }`}
      >
        {/* Card Back */}
        <div className="absolute w-full h-full backface-hidden rounded-xl shadow-2xl border-2 border-mystic-700 bg-mystic-800 overflow-hidden flex items-center justify-center group hover:shadow-mystic-500/50 transition-shadow">
            {/* Mystical Pattern CSS */}
            <div className="absolute inset-2 border border-mystic-600/50 rounded-lg opacity-50"></div>
            <div className="absolute inset-4 border border-mystic-600/30 rounded-lg opacity-50"></div>
            <div className="text-5xl opacity-20 group-hover:opacity-40 transition-opacity duration-500">
               👁️
            </div>
            <div className="absolute bottom-4 text-xs text-mystic-500 tracking-widest uppercase">Mystic Tarot</div>
        </div>

        {/* Card Front */}
        <div 
          className={`absolute w-full h-full backface-hidden rotate-y-180 rounded-xl shadow-2xl border border-mystic-gold/30 bg-gradient-to-br from-slate-900 to-mystic-900 flex flex-col items-center justify-between p-4 text-mystic-gold overflow-hidden ${card.isReversed ? 'rotate-180' : ''}`}
        >
          {/* Decorative Corners */}
          <div className="absolute top-2 left-2 text-xs opacity-50">✦</div>
          <div className="absolute top-2 right-2 text-xs opacity-50">✦</div>
          <div className="absolute bottom-2 left-2 text-xs opacity-50">✦</div>
          <div className="absolute bottom-2 right-2 text-xs opacity-50">✦</div>

          <div className="mt-2 text-center">
            <div className="text-xs uppercase tracking-widest text-mystic-silver opacity-70">{card.suit}</div>
            <div className="font-serif text-xl font-bold mt-1 leading-tight">{card.name}</div>
          </div>

          <div className="flex-1 flex items-center justify-center w-full">
            <div className="text-6xl filter drop-shadow-lg animate-float">
              {getSuitIcon(card.suit)}
            </div>
          </div>

          <div className="mb-4 text-center">
            <div className="text-xs italic text-gray-400 mb-1">{card.nameEn}</div>
            {card.isReversed && <div className="text-xs text-red-400 font-bold uppercase tracking-wider">Reverse (逆位)</div>}
            {!card.isReversed && <div className="text-xs text-green-400 font-bold uppercase tracking-wider">Upright (正位)</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TarotCard;