import type { GameState } from '../App';

const STORAGE_KEY = 'q2_official_save';

export function loadProgress(): GameState | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      return {
        level: data.level || 1,
        correctCount: data.correctCount || 0
      };
    }
  } catch (error) {
    console.error('Failed to load progress:', error);
  }
  return null;
}

export function saveProgress(state: GameState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save progress:', error);
  }
}
