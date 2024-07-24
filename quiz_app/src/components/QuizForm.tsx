import { Button, FormControl, FormControlLabel, Radio, RadioGroup, Typography, Card, CardContent } from '@mui/material';
import { useState } from 'react';

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
}

interface QuizFormProps {
  questions: Question[];
  onSubmit: (score: number) => void;
}

const QuizForm = ({ questions, onSubmit }: QuizFormProps) => {
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleChange = (questionId: string, value: string) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    const score = questions.reduce((acc, question) => {
      return acc + (userAnswers[question.id] === question.correctAnswer ? 1 : 0);
    }, 0);
    onSubmit(score);
  };

  const handleNext = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrev = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px' }}>
      <Card style={{ width: '600px', margin: '20px 0' }}>
        <CardContent>
          <FormControl component="fieldset">
            <Typography variant="h6">{currentQuestion.text}</Typography>
            <RadioGroup
              name={currentQuestion.id}
              value={userAnswers[currentQuestion.id] || ''}
              onChange={(e) => handleChange(currentQuestion.id, e.target.value)}
            >
              {currentQuestion.options.map((option) => (
                <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
              ))}
            </RadioGroup>
          </FormControl>
        </CardContent>
      </Card>

      <div style={{ display: 'flex', justifyContent: 'space-between', width: '600px' }}>
        <Button
          variant="contained"
          onClick={handlePrev}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>

        {currentQuestionIndex < questions.length - 1 ? (
          <Button variant="contained" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuizForm;
