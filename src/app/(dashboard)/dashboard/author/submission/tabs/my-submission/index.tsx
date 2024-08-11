// components/MySubmissionTab.tsx
'use client';

import * as React from 'react';
import { getSubmittedManuscripts } from '@/api/manuscript';
import { Alert, Box, CircularProgress, Pagination, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import dayjs from 'dayjs';

import type { Journal } from '@/types';

import { JournalCard } from '../../components/journals/journals-card';
import { JournalsFilters } from '../../components/journals/journals-filters';

const MySubmissionTab: React.FC = () => {
  const [journals, setJournals] = React.useState<Journal[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchJournals = async () => {
      try {
        const data = await getSubmittedManuscripts();
        setJournals(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJournals();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Stack spacing={3} sx={{ marginY: '15px' }}>
      <JournalsFilters />
      <Grid container spacing={3}>
        {journals.map((journal) => (
          <Grid key={journal.id} lg={6} md={12} xs={12}>
            <JournalCard journal={journal} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination count={3} size="small" />
      </Box>
    </Stack>
  );
};

export default MySubmissionTab;
