import { useState, useEffect } from 'react';
import GameHeader from './components/GameHeader';
import QuestionCard from './components/QuestionCard';
import LevelUpOverlay from './components/LevelUpOverlay';
import AdPlaceholderBanner from './components/AdPlaceholderBanner';
import ProgressBar from './components/ProgressBar';
import { useOpenTdbQuestion } from './hooks/useOpenTdbQuestion';
import { useBackgroundMusic } from './hooks/useBackgroundMusic';
import { loadProgress, saveProgress } from './lib/persistence';
import { computeGoal, computeProgressPercent, applyAnswerResult } from './lib/progression';

export interface GameState {
  level: number;
  correctCount: number;
}

function App() {
  const [gameState, setGameState] = useState<GameState>({ level: 1, correctCount: 0 });
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [isAnswerLocked, setIsAnswerLocked] = useState(false);
  
  const { question, loading, loadNextQuestion } = useOpenTdbQuestion();
  const { isMuted, toggle: toggleMusic } = useBackgroundMusic();

  // Load saved progress on mount
  useEffect(() => {
    const saved = loadProgress();
    if (saved) {
      setGameState(saved);
    }
  }, []);

  // Save progress whenever it changes
  useEffect(() => {
    saveProgress(gameState);
  }, [gameState]);

  const handleAnswerSelected = (selectedIndex: number, isCorrect: boolean) => {
    setIsAnswerLocked(true);

    const result = applyAnswerResult(gameState, isCorrect);
    
    if (result.leveledUp) {
      // Level up - show overlay after a short delay
      setTimeout(() => {
        setGameState(result.newState);
        setShowLevelUp(true);
        setIsAnswerLocked(false);
      }, 800);
    } else {
      // Normal progression - load next question after delay
      setTimeout(() => {
        setGameState(result.newState);
        setIsAnswerLocked(false);
        loadNextQuestion();
      }, 1500);
    }
  };

  const handleContinue = () => {
    setShowLevelUp(false);
    loadNextQuestion();
  };

  const goal = computeGoal(gameState.level);
  const progressPercent = computeProgressPercent(gameState.correctCount, goal);

  return (
    <div className="min-h-screen bg-[oklch(0.96_0.01_85)] flex items-center justify-center p-4">
      <div className="w-full max-w-[500px] bg-card rounded-lg shadow-2xl flex flex-col relative overflow-hidden" style={{ height: '100vh', maxHeight: '900px' }}>
        <GameHeader
          level={gameState.level}
          isMuted={isMuted}
          onToggleMusic={toggleMusic}
        />

        <main className="flex-1 p-6 overflow-y-auto flex flex-col">
          <ProgressBar percent={progressPercent} />
          
          {loading && !question ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-muted-foreground">Loading question...</div>
            </div>
          ) : question ? (
            <QuestionCard
              question={question}
              onAnswerSelected={handleAnswerSelected}
              isLocked={isAnswerLocked}
            />
          ) : null}
        </main>

        <AdPlaceholderBanner />

        <LevelUpOverlay
          isOpen={showLevelUp}
          level={gameState.level}
          onContinue={handleContinue}
        />
      </div>
    </div>
  );
}

export default App;
