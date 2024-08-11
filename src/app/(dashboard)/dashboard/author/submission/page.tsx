import * as React from 'react';
import type { Metadata } from 'next';

import { config } from '@/config';
import { SubmissionPageTabs } from '@/components/dashboard/common/config/tabs';
import PageLayout from '@/components/dashboard/common/page/layout';
import PageTabs from '@/components/dashboard/common/page/tabs';
import PageTitleBar from '@/components/dashboard/common/page/title-bar/page';

export const metadata = { title: `Submission | Dashboard | ${config.site.name}` } satisfies Metadata;

const SubmissionPage: React.FC = () => {
  return (
    <PageLayout>
      <PageTitleBar title="Submission" />
      <PageTabs pageName="Submission" tabs={SubmissionPageTabs} />
    </PageLayout>
  );
};

export default SubmissionPage;
