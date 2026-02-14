import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { Question } from '../lib/opentdb';

interface QuestionCardProps {
  question: Question;
  onAnswerSelected: (index: number, isCorrect: boolean) => void;
  isLocked: boolean;
}

type AnswerState = 'idle' | 'correct' | 'wrong';

export default function QuestionCard({ question, onAnswerSelected, isLocked }: QuestionCardProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answerStates, setAnswerStates] = useState<AnswerState[]>(
    question.answers.map(() => 'idle')
  );

  const handleAnswerClick = (index: number) => {
    if (isLocked || selectedIndex !== null) return;

    setSelectedIndex(index);
    const isCorrect = index === question.correctIdx;

    // Update answer states
    const newStates = question.answers.map((_, i) => {
      if (i === index) {
        return isCorrect ? 'correct' : 'wrong';
      }
      if (i === question.correctIdx && !isCorrect) {
        return 'correct';
      }
      return 'idle';
    });
    setAnswerStates(newStates);

    onAnswerSelected(index, isCorrect);
  };

  const getButtonClassName = (state: AnswerState) => {
    if (state === 'correct') {
      return 'bg-[oklch(0.65_0.18_145)] hover:bg-[oklch(0.65_0.18_145)] text-white border-[oklch(0.65_0.18_145)]';
    }
    if (state === 'wrong') {
      return 'bg-[oklch(0.60_0.22_25)] hover:bg-[oklch(0.60_0.22_25)] text-white border-[oklch(0.60_0.22_25)]';
    }
    return 'bg-white hover:bg-[oklch(0.97_0.01_85)] border-[oklch(0.92_0.01_85)]';
  };

  return (
    <Card className="p-6 border-[oklch(0.92_0.01_85)] shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground leading-relaxed">
          {question.text}
        </h2>
      </div>

      <div className="space-y-3">
        {question.answers.map((answer, index) => (
          <Button
            key={index}
            onClick={() => handleAnswerClick(index)}
            disabled={isLocked || selectedIndex !== null}
            className={`w-full h-auto py-4 px-5 text-left justify-start font-medium text-base border-2 rounded-2xl transition-all ${getButtonClassName(answerStates[index])}`}
            variant="outline"
          >
            {answer}
          </Button>
        ))}
      </div>
    </Card>
  );
}
