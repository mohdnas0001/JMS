import * as React from 'react';
import type { Metadata } from 'next';
import Grid from '@mui/material/Unstable_Grid2';

import { config } from '@/config';
import { Approved } from '@/components/dashboard/overview/Approved';
import { AwaitingReview } from '@/components/dashboard/overview/AwaitingReview';
import { InReview } from '@/components/dashboard/overview/InReview';
import { TotalSubmitted } from '@/components/dashboard/overview/TotalSubmitted';

export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } satisfies Metadata;

const Page: React.FC = (): React.JSX.Element => {
  return (
    <Grid container spacing={3}>
      <Grid lg={3} sm={6} xs={12}>
        <TotalSubmitted sx={{ height: '100%' }} value="24" />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <AwaitingReview sx={{ height: '100%' }} value="3" />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <InReview sx={{ height: '100%' }} value="3" />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <Approved sx={{ height: '100%' }} value="1" />
      </Grid>
    </Grid>
  );
};

export default Page;
