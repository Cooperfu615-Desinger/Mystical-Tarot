
import React, { useState, useMemo } from 'react';
import { FULL_DECK_DATA } from '../utils/tarotData';
import { Suit, TarotCardData } from '../types';

const CardLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSuit, setSelectedSuit] = useState<string>('ALL');
  const [selectedCard, setSelectedCard] = useState<TarotCardData | null>(null);

  const filteredCards = useMemo(() => {
    return FULL_DECK_DATA.filter(card => {
      const matchesSearch = card.name.includes(searchTerm) || 
                            card.nameEn.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSuit = selectedSuit === 'ALL' || card.suit === selectedSuit;
      return matchesSearch && matchesSuit;
    });
  }, [searchTerm, selectedSuit]);

  const suits = ['ALL', Suit.Major, Suit.Wands, Suit.Cups, Suit.Swords, Suit.Pentacles];

  return (
    <div className="w-full max-w-6xl mx-auto p-4 animate-fade-in pb-24">
      <h2 className="text-3xl font-bold text-center text-mystic-gold mb-8">塔羅牌典</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center items-center">
        <input
          type="text"
          placeholder="搜尋牌名..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 bg-mystic-800 border border-mystic-600 rounded-lg text-white placeholder-mystic-500 focus:outline-none focus:border-mystic-gold w-full md:w-64"
        />
        <div className="flex gap-2 flex-wrap justify-center">
          {suits.map(s => (
            <button
              key={s}
              onClick={() => setSelectedSuit(s)}
              className={`px-3 py-1 rounded-full text-xs md:text-sm transition-all ${
                selectedSuit === s 
                  ? 'bg-mystic-gold text-mystic-900 font-bold' 
                  : 'bg-mystic-800 text-mystic-silver hover:bg-mystic-700'
              }`}
            >
              {s === 'ALL' ? '全部' : s}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredCards.map(card => (
          <div 
            key={card.id}
            onClick={() => setSelectedCard(card)}
            className="bg-mystic-800/50 border border-mystic-700 rounded-lg p-4 cursor-pointer hover:border-mystic-gold/50 hover:bg-mystic-700/50 transition-all flex flex-col items-center text-center group"
          >
            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                {card.suit === Suit.Wands ? '🪄' : 
                 card.suit === Suit.Cups ? '🏆' : 
                 card.suit === Suit.Swords ? '⚔️' : 
                 card.suit === Suit.Pentacles ? '🪙' : '🔮'}
            </div>
            <h3 className="text-mystic-gold font-bold text-sm">{card.name}</h3>
            <p className="text-xs text-mystic-500">{card.nameEn}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedCard(null)}>
          <div className="bg-mystic-900 border border-mystic-gold/30 rounded-xl max-w-lg w-full p-6 shadow-2xl transform scale-100 animate-fade-in" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-mystic-gold">{selectedCard.name}</h3>
                <p className="text-mystic-silver italic">{selectedCard.nameEn}</p>
              </div>
              <button onClick={() => setSelectedCard(null)} className="text-mystic-500 hover:text-white text-xl">&times;</button>
            </div>
            
            <div className="space-y-4 text-gray-200">
              <div className="flex gap-2 flex-wrap">
                {selectedCard.keywords.map(k => (
                  <span key={k} className="px-2 py-1 bg-mystic-700 rounded text-xs text-purple-200">{k}</span>
                ))}
              </div>
              
              <div className="p-3 bg-mystic-800 rounded-lg border-l-4 border-green-500">
                <h4 className="font-bold text-green-400 text-sm mb-1">正位 (Upright)</h4>
                <p className="text-sm">{selectedCard.meaningUpright}</p>
              </div>
              
              <div className="p-3 bg-mystic-800 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 text-sm mb-1">逆位 (Reversed)</h4>
                <p className="text-sm">{selectedCard.meaningReversed}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardLibrary;
