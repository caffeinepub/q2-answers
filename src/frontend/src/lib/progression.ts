import type { GameState } from '../App';

export function computeGoal(level: number): number {
  return 5 + level * 2;
}

export function computeProgressPercent(correctCount: number, goal: number): number {
  return Math.max(0, Math.min(100, (correctCount / goal) * 100));
}

export interface AnswerResult {
  newState: GameState;
  leveledUp: boolean;
}

export function applyAnswerResult(currentState: GameState, isCorrect: boolean): AnswerResult {
  if (!isCorrect) {
    return {
      newState: currentState,
      leveledUp: false
    };
  }

  const newCorrectCount = currentState.correctCount + 1;
  const goal = computeGoal(currentState.level);

  if (newCorrectCount >= goal) {
    // Level up!
    return {
      newState: {
        level: currentState.level + 1,
        correctCount: 0
      },
      leveledUp: true
    };
  }

  return {
    newState: {
      ...currentState,
      correctCount: newCorrectCount
    },
    leveledUp: false
  };
}
