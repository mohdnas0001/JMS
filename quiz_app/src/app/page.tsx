// app/page.js
import Link from 'next/link';
import { Typography, Button } from '@mui/material';

export default function Home() {
  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4">Welcome to the Quiz App</Typography>
      <Link href="/quiz/1" passHref>
        <Button variant="contained" style={{ marginTop: '20px' }}>
          Start Quiz
        </Button>
      </Link>
    </div>
  );
}
