
import React, { useState, useEffect } from 'react';
import { getHistory, updateNote, deleteReading } from '../utils/storage';
import { ReadingRecord } from '../types';

const HistoryLog: React.FC = () => {
  const [history, setHistory] = useState<ReadingRecord[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [noteEditId, setNoteEditId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleUpdateNote = (id: string) => {
    const updated = updateNote(id, noteText);
    setHistory(updated);
    setNoteEditId(null);
  };

  const startEditNote = (record: ReadingRecord) => {
    setNoteEditId(record.id);
    setNoteText(record.userNotes);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
      e.stopPropagation();
      if(confirm("確定要刪除這筆紀錄嗎？")) {
          const updated = deleteReading(id);
          setHistory(updated);
          if(expandedId === id) setExpandedId(null);
      }
  }

  if (history.length === 0) {
    return (
        <div className="w-full max-w-4xl mx-auto p-8 text-center text-mystic-500 animate-fade-in">
            <div className="text-6xl mb-4">📜</div>
            <p>目前沒有占卜紀錄。</p>
        </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 animate-fade-in pb-24">
      <h2 className="text-3xl font-bold text-center text-mystic-gold mb-8">靈魂足跡 (歷史紀錄)</h2>
      
      <div className="space-y-4">
        {history.map(record => (
          <div 
            key={record.id} 
            className="bg-mystic-800/40 border border-mystic-600 rounded-xl overflow-hidden transition-all hover:border-mystic-500"
          >
            {/* Header */}
            <div 
              className="p-4 flex justify-between items-center cursor-pointer bg-mystic-800/60"
              onClick={() => setExpandedId(expandedId === record.id ? null : record.id)}
            >
              <div>
                <div className="font-bold text-mystic-gold">{record.spreadName}</div>
                <div className="text-xs text-mystic-silver opacity-70">
                  {new Date(record.date).toLocaleString('zh-TW')}
                </div>
              </div>
              <div className="flex items-center gap-4">
                  <div className="text-xs bg-mystic-700 px-2 py-1 rounded">
                    {record.cards.length} 張牌
                  </div>
                  <button onClick={(e) => handleDelete(record.id, e)} className="text-gray-500 hover:text-red-400">&times;</button>
              </div>
            </div>

            {/* Expanded Content */}
            {expandedId === record.id && (
              <div className="p-6 border-t border-mystic-700 bg-black/20">
                {/* Cards Summary */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {record.cards.map((card, idx) => (
                    <span key={idx} className={`text-xs px-2 py-1 rounded border ${card.isReversed ? 'border-red-900 text-red-200 bg-red-900/20' : 'border-green-900 text-green-200 bg-green-900/20'}`}>
                      {card.name} {card.isReversed ? '(逆)' : ''}
                    </span>
                  ))}
                </div>

                {/* Interpretation */}
                <div className="prose prose-invert prose-sm max-w-none mb-6 text-gray-300 whitespace-pre-wrap bg-mystic-900/50 p-4 rounded-lg">
                  {record.interpretation}
                </div>

                {/* Personal Notes */}
                <div className="mt-4 border-t border-mystic-700 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-bold text-purple-300">🔮 個人備註</h4>
                    {noteEditId !== record.id && (
                      <button onClick={(e) => { e.stopPropagation(); startEditNote(record); }} className="text-xs text-mystic-gold hover:underline">
                        {record.userNotes ? '編輯' : '新增筆記'}
                      </button>
                    )}
                  </div>

                  {noteEditId === record.id ? (
                    <div className="flex flex-col gap-2" onClick={e => e.stopPropagation()}>
                      <textarea
                        className="w-full bg-mystic-900 border border-mystic-600 rounded p-2 text-sm text-white focus:border-mystic-gold outline-none"
                        rows={3}
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        placeholder="寫下你的感悟..."
                      />
                      <div className="flex gap-2 justify-end">
                        <button onClick={() => setNoteEditId(null)} className="text-xs text-gray-400 px-3 py-1">取消</button>
                        <button onClick={() => handleUpdateNote(record.id)} className="text-xs bg-mystic-600 text-white px-3 py-1 rounded hover:bg-mystic-500">儲存</button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400 italic">
                      {record.userNotes || "尚無備註..."}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryLog;
