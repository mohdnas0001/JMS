import * as React from 'react';
import type { Metadata } from 'next';

import { config } from '@/config';
import { SubmitManuscriptPageTabs } from '@/components/dashboard/common/config/tabs';
import PageLayout from '@/components/dashboard/common/page/layout';
import PageTabs from '@/components/dashboard/common/page/tabs';
import PageTitleBar from '@/components/dashboard/common/page/title-bar/page';

export const metadata = { title: `Submit Manuscript | Dashboard | ${config.site.name}` } satisfies Metadata;

const SubmitManuscriptPage: React.FC = () => {
  return (
    <PageLayout>
      <PageTitleBar title="Submit Manuscript" />
      <PageTabs pageName="Submit Manuscript" tabs={SubmitManuscriptPageTabs} />
    </PageLayout>
  );
};

export default SubmitManuscriptPage;
