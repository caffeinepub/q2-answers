import { useState, useEffect, useCallback } from 'react';
import { fetchQuestion, type Question } from '../lib/opentdb';

export function useOpenTdbQuestion() {
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  const loadQuestion = useCallback(async () => {
    setLoading(true);
    const q = await fetchQuestion();
    
    if (q) {
      setQuestion(q);
      setLoading(false);
      setRetryCount(0);
    } else {
      // Retry after delay
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
      }, 2000);
    }
  }, []);

  useEffect(() => {
    loadQuestion();
  }, [loadQuestion, retryCount]);

  const loadNextQuestion = useCallback(() => {
    setQuestion(null);
    loadQuestion();
  }, [loadQuestion]);

  return {
    question,
    loading,
    loadNextQuestion
  };
}
