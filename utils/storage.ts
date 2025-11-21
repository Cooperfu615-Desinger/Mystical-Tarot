
import { ReadingRecord, SpreadType, DrawnCard } from '../types';
import { SPREAD_DEFINITIONS } from './spreadDefinitions';

const STORAGE_KEY = 'mystic_tarot_history_v1';

export const saveReading = (spreadType: SpreadType, cards: DrawnCard[], interpretation: string): ReadingRecord => {
  const history = getHistory();
  
  const newRecord: ReadingRecord = {
    id: Date.now().toString(36) + Math.random().toString(36).substring(2),
    date: Date.now(),
    spreadId: spreadType,
    spreadName: SPREAD_DEFINITIONS[spreadType].name,
    cards,
    interpretation,
    userNotes: ''
  };

  const updatedHistory = [newRecord, ...history];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  return newRecord;
};

export const getHistory = (): ReadingRecord[] => {
  try {
    const item = localStorage.getItem(STORAGE_KEY);
    return item ? JSON.parse(item) : [];
  } catch (e) {
    console.error("Failed to load history", e);
    return [];
  }
};

export const updateNote = (id: string, note: string): ReadingRecord[] => {
  const history = getHistory();
  const updated = history.map(record => 
    record.id === id ? { ...record, userNotes: note } : record
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const deleteReading = (id: string): ReadingRecord[] => {
    const history = getHistory();
    const updated = history.filter(r => r.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
}
