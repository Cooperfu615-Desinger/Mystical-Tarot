
import React, { useState, useRef } from 'react';
import { SpreadType, DrawnCard } from './types';
import { SPREAD_DEFINITIONS } from './utils/spreadDefinitions';
import { shuffleAndDraw } from './utils/tarotDeck';
import { getTarotReading } from './services/geminiService';
import { saveReading } from './utils/storage';
import StarryBackground from './components/StarryBackground';
import TarotCard from './components/TarotCard';
import CardLibrary from './components/CardLibrary';
import HistoryLog from './components/HistoryLog';
import MagicEditor from './components/MagicEditor';

// Simple Icons
const Icons = {
  Home: () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  History: () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Book: () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
  Magic: () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>,
  Spinner: () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  )
};

type AppTab = 'HOME' | 'HISTORY' | 'LIBRARY' | 'MAGIC';

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<AppTab>('HOME');
  const [spreadType, setSpreadType] = useState<SpreadType | null>(null);
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [reading, setReading] = useState<string>("");
  const [isReadingLoading, setIsReadingLoading] = useState<boolean>(false);
  const [appState, setAppState] = useState<'MENU' | 'SHUFFLING' | 'REVEAL' | 'READING'>('MENU');
  const readingRef = useRef<HTMLDivElement>(null);

  const handleStart = (type: SpreadType) => {
    setSpreadType(type);
    setAppState('SHUFFLING');
    setReading("");
    
    setTimeout(() => {
      const def = SPREAD_DEFINITIONS[type];
      const cards = shuffleAndDraw(def.cardsCount);
      setDrawnCards(cards);
      setAppState('REVEAL');
    }, 1500);
  };

  const handleReveal = (index: number) => {
    const newCards = [...drawnCards];
    newCards[index].isRevealed = true;
    setDrawnCards(newCards);

    if (newCards.every(c => c.isRevealed)) {
       fetchReading(newCards);
    }
  };

  const fetchReading = async (cards: DrawnCard[]) => {
    if (!spreadType) return;
    setIsReadingLoading(true);
    setTimeout(async () => {
      const result = await getTarotReading(cards, spreadType);
      setReading(result);
      setIsReadingLoading(false);
      setAppState('READING');
      
      // Auto save to history
      saveReading(spreadType, cards, result);

      setTimeout(() => {
        readingRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 1000);
  };

  const resetApp = () => {
    setSpreadType(null);
    setDrawnCards([]);
    setReading("");
    setAppState('MENU');
  };

  // Spread Selection Buttons configuration
  const spreadOptions = [
    { type: SpreadType.OneCard, icon: "🌟", color: "from-mystic-gold to-transparent" },
    { type: SpreadType.ThreeCard, icon: "⏳", color: "from-purple-400 to-transparent" },
    { type: SpreadType.Love, icon: "❤️", color: "from-pink-400 to-transparent" },
    { type: SpreadType.Choice, icon: "⚖️", color: "from-blue-400 to-transparent" },
    { type: SpreadType.CelticCross, icon: "✝️", color: "from-green-400 to-transparent" },
  ];

  return (
    <div className="min-h-screen w-full relative flex flex-col items-center font-serif bg-mystic-900 text-white">
      <StarryBackground />
      
      {/* Top Navigation Bar */}
      <nav className="z-20 w-full bg-mystic-900/80 backdrop-blur-md border-b border-mystic-700 fixed top-0">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
           <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentTab('HOME')}>
             <span className="text-2xl">🔮</span>
             <span className="font-bold text-mystic-gold hidden md:block">Mystic Tarot</span>
           </div>
           <div className="flex gap-1 bg-mystic-800 p-1 rounded-full overflow-x-auto max-w-[70vw]">
             <button 
                onClick={() => setCurrentTab('HOME')}
                className={`px-3 md:px-4 py-2 rounded-full flex items-center gap-2 text-sm transition-all whitespace-nowrap ${currentTab === 'HOME' ? 'bg-mystic-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
             >
               <Icons.Home /> <span className="hidden sm:block">占卜</span>
             </button>
             <button 
                onClick={() => setCurrentTab('HISTORY')}
                className={`px-3 md:px-4 py-2 rounded-full flex items-center gap-2 text-sm transition-all whitespace-nowrap ${currentTab === 'HISTORY' ? 'bg-mystic-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
             >
               <Icons.History /> <span className="hidden sm:block">紀錄</span>
             </button>
             <button 
                onClick={() => setCurrentTab('LIBRARY')}
                className={`px-3 md:px-4 py-2 rounded-full flex items-center gap-2 text-sm transition-all whitespace-nowrap ${currentTab === 'LIBRARY' ? 'bg-mystic-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
             >
               <Icons.Book /> <span className="hidden sm:block">牌典</span>
             </button>
             <button 
                onClick={() => setCurrentTab('MAGIC')}
                className={`px-3 md:px-4 py-2 rounded-full flex items-center gap-2 text-sm transition-all whitespace-nowrap ${currentTab === 'MAGIC' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
             >
               <Icons.Magic /> <span className="hidden sm:block">魔法</span>
             </button>
           </div>
        </div>
      </nav>

      <main className="z-10 w-full flex-1 flex flex-col items-center justify-start pt-24 pb-20">
        
        {currentTab === 'HISTORY' && <HistoryLog />}
        {currentTab === 'LIBRARY' && <CardLibrary />}
        {currentTab === 'MAGIC' && <MagicEditor />}
        
        {currentTab === 'HOME' && (
          <div className="w-full max-w-6xl px-4 flex flex-col items-center">
            
            {appState === 'MENU' && (
              <>
                <header className="mb-10 text-center animate-fade-in">
                  <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-mystic-gold to-purple-300 mb-4 tracking-wider drop-shadow-lg">
                    神秘塔羅
                  </h1>
                  <p className="text-mystic-silver text-sm md:text-base tracking-widest uppercase opacity-80">
                    請選擇您的牌陣，聆聽宇宙的聲音
                  </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full animate-fade-in">
                  {spreadOptions.map((option) => {
                    const def = SPREAD_DEFINITIONS[option.type];
                    return (
                      <button 
                        key={option.type}
                        onClick={() => handleStart(option.type)}
                        className="group relative px-6 py-6 bg-mystic-800/50 hover:bg-mystic-700/60 border border-mystic-600 rounded-xl transition-all duration-300 overflow-hidden shadow-lg hover:shadow-mystic-500/30 text-left flex flex-col h-full"
                      >
                        <div className={`absolute inset-0 w-1 bg-gradient-to-b ${option.color} group-hover:w-full transition-all duration-500 opacity-10`}></div>
                        <div className="flex items-center justify-between mb-3 z-10">
                          <h3 className="text-xl font-bold text-white group-hover:text-mystic-gold transition-colors">{def.name}</h3>
                          <span className="text-2xl">{option.icon}</span>
                        </div>
                        <p className="text-sm text-gray-400 z-10 flex-grow">{def.description}</p>
                        <div className="mt-4 text-xs text-mystic-500 font-mono uppercase tracking-wider border-t border-mystic-700/50 pt-2">
                          {def.cardsCount} Cards
                        </div>
                      </button>
                    )
                  })}
                </div>
              </>
            )}

            {appState === 'SHUFFLING' && (
              <div className="mt-32 flex flex-col items-center animate-pulse-slow">
                <div className="text-6xl mb-6 animate-spin" style={{ animationDuration: '3s' }}>🔮</div>
                <p className="text-xl text-mystic-silver tracking-widest">洗牌中...</p>
                <p className="text-sm text-mystic-600 mt-2">請在心中默念您的問題</p>
              </div>
            )}

            {(appState === 'REVEAL' || appState === 'READING') && spreadType && (
              <div className="w-full flex flex-col items-center">
                <div className="mb-8 text-center">
                   <h2 className="text-2xl font-bold text-mystic-gold">{SPREAD_DEFINITIONS[spreadType].name}</h2>
                   <p className="text-mystic-silver/80 text-sm mt-2">
                    {appState === 'REVEAL' && !drawnCards.every(c => c.isRevealed) 
                      ? "點擊卡背以翻開牌面" 
                      : "命運已揭曉"}
                   </p>
                </div>

                <div className="flex flex-wrap justify-center gap-4 md:gap-8 w-full">
                  {drawnCards.map((card, index) => {
                    const posName = SPREAD_DEFINITIONS[spreadType].positions[index]?.name || `Position ${index + 1}`;
                    return (
                      <div key={card.id} className="flex flex-col items-center">
                        <div className="mb-2 text-xs text-mystic-silver uppercase tracking-wider opacity-70 font-bold bg-mystic-900/50 px-2 py-1 rounded">
                           {index + 1}. {posName}
                        </div>
                        <TarotCard 
                          card={card} 
                          index={index} 
                          onReveal={handleReveal} 
                        />
                      </div>
                    );
                  })}
                </div>
                
                {isReadingLoading && (
                  <div className="mt-12 flex flex-col items-center animate-fade-in bg-mystic-900/80 p-6 rounded-xl border border-mystic-700 z-20">
                    <Icons.Spinner />
                    <p className="mt-4 text-mystic-gold animate-pulse">正在連結阿卡西紀錄...</p>
                    <p className="text-xs text-gray-500 mt-2">Gemini AI 正在解讀您的牌陣</p>
                  </div>
                )}
              </div>
            )}

            {appState === 'READING' && reading && (
              <div 
                ref={readingRef}
                className="mt-12 w-full max-w-4xl bg-mystic-800/40 backdrop-blur-sm border border-mystic-600/50 rounded-2xl p-8 md:p-12 shadow-2xl animate-fade-in mb-12"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-center text-mystic-gold mb-8 border-b border-mystic-600 pb-4">
                  牌陣解讀
                </h2>
                <div className="prose prose-invert prose-p:text-gray-200 prose-headings:text-purple-300 max-w-none leading-relaxed space-y-6 whitespace-pre-wrap">
                   {reading}
                </div>
                
                <div className="mt-12 flex justify-center">
                  <button 
                    onClick={resetApp}
                    className="px-8 py-3 bg-gradient-to-r from-mystic-600 to-mystic-800 hover:from-mystic-500 hover:to-mystic-700 text-white rounded-full transition-all shadow-lg hover:shadow-purple-500/50 border border-white/10"
                  >
                    開始新的占卜
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
