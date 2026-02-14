export interface Question {
  text: string;
  answers: string[];
  correctIdx: number;
}

interface OpenTDBQuestion {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface OpenTDBResponse {
  response_code: number;
  results: OpenTDBQuestion[];
}

interface TokenResponse {
  response_code: number;
  token?: string;
}

let sessionToken: string | null = null;

export async function requestSessionToken(): Promise<string | null> {
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data: TokenResponse = await response.json();
    if (data.token) {
      sessionToken = data.token;
      return data.token;
    }
  } catch (error) {
    console.error('Token request error:', error);
  }
  return null;
}

export function decodeHtml(html: string): string {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = html;
  return textarea.value;
}

function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export async function fetchQuestion(): Promise<Question | null> {
  if (!sessionToken) {
    await requestSessionToken();
  }

  const url = `https://opentdb.com/api.php?amount=1&type=multiple${sessionToken ? `&token=${sessionToken}` : ''}`;

  try {
    const response = await fetch(url);
    const data: OpenTDBResponse = await response.json();

    if (data.response_code === 0 && data.results.length > 0) {
      const q = data.results[0];
      const decodedCorrect = decodeHtml(q.correct_answer);
      const decodedIncorrect = q.incorrect_answers.map(decodeHtml);
      const allAnswers = shuffle([...decodedIncorrect, decodedCorrect]);

      return {
        text: decodeHtml(q.question),
        answers: allAnswers,
        correctIdx: allAnswers.indexOf(decodedCorrect)
      };
    } else if (data.response_code === 3 || data.response_code === 4) {
      // Token expired or empty - request new token and retry
      await requestSessionToken();
      return fetchQuestion();
    }
  } catch (error) {
    console.error('Question fetch error:', error);
  }

  return null;
}
