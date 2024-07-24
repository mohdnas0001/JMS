// components/Timer.tsx
import { useEffect, useState } from 'react';

interface TimerProps {
  duration: number;
  onTimeUp: () => void;
}

const Timer = ({ duration, onTimeUp }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState<number>(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  return (
    <div>
      <h2>Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60}</h2>
    </div>
  );
};

export default Timer;
