"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import QuizForm from '@/components/QuizForm';
import Timer from '@/components/Timer';
import { Box } from '@mui/system';

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
}

export default function QuizPage({ params }: { params: { id: string } }) {
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [quizId, setQuizId] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      setQuizId(params.id);
      // Mock quiz data for demonstration, replace with actual data fetching
      const fetchedQuestions: Question[] = [
        { id: 'q1', text: 'What is 2 + 2?', options: ['3', '4', '5'], correctAnswer: '4' },
        { id: 'q2', text: 'What is the capital of France?', options: ['Berlin', 'Madrid', 'Paris'], correctAnswer: 'Paris' }
      ];
      setQuestions(fetchedQuestions);
    }
  }, [params.id]);

  const handleSubmit = (score: number) => {
    setFinalScore(score);
  };

  const handleTimeUp = () => {
    // Handle time up logic
  };

  return (
    <div>
    <Box sx={{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        margin:'10px auto'
    }}>
      <Timer duration={100} onTimeUp={handleTimeUp} />
      {questions.length > 0 && <QuizForm questions={questions} onSubmit={handleSubmit} />}
      {finalScore !== null && (
        <div>
          <h2>Your Final Score: {finalScore}</h2>
        </div>
      )}
    </Box>
    </div>
  );
}
