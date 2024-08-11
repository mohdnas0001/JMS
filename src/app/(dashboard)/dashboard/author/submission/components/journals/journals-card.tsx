import * as React from 'react';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';

// Define the structure of the journal data
export interface Journal {
  id: string;
  title: string;
  status: 'Approved' | 'Under Review' | 'Submitted';
  author: string;
  coAuthor: string[];
  createdAt: Date;
}

export interface JournalCardProps {
  journal: Journal;
}

export const JournalCard = ({ journal }: JournalCardProps): React.JSX.Element => {
  const canEdit = journal.status === 'Submitted';

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', boxShadow: 3, position: 'relative' }}>
      {/* Status Badge */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          m: 0,
          px: 2,
          py: 0.5,
          borderRadius: 0,
          backgroundColor:
            journal.status === 'Approved' ? '#d4edda' : journal.status === 'Under Review' ? '#fff3cd' : '#e2e3e5',
          color: journal.status === 'Approved' ? '#155724' : journal.status === 'Under Review' ? '#856404' : '#383d41',
          zIndex: 1,
        }}
      >
        {journal.status}
      </Box>

      <CardContent sx={{ flex: '1 1 auto', marginTop: '15px' }}>
        <Stack spacing={2}>
          <Typography align="center" variant="h5" sx={{ mb: 1 }}>
            {journal.title}
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body1">
              <strong>Author:</strong> {journal.author}
            </Typography>
            <Typography variant="body1">
              <strong>Co-authors:</strong> {journal.coAuthor.length > 0 ? journal.coAuthor.join(', ') : 'None'}
            </Typography>
            <Typography variant="body1">
              <strong>Submission Date:</strong> {dayjs(journal.createdAt).format('MMM D, YYYY')}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
        <Button variant="outlined" size="small" sx={{ textTransform: 'none' }}>
          View Details
        </Button>
        {canEdit ? (
          <Button variant="outlined" size="small" sx={{ textTransform: 'none' }}>
            Edit
          </Button>
        ) : (
          <Button variant="outlined" size="small" sx={{ textTransform: 'none', color: 'text.disabled' }} disabled>
            Edit
          </Button>
        )}
        <Button variant="outlined" size="small" sx={{ textTransform: 'none' }}>
          Download PDF
        </Button>
      </Stack>
    </Card>
  );
};
