import * as React from 'react';
import type { Metadata } from 'next';

import { config } from '@/config';
import { SectionsPageTab } from '@/components/dashboard/common/config/tabs';
import PageLayout from '@/components/dashboard/common/page/layout';
import PageTabs from '@/components/dashboard/common/page/tabs';
import PageTitleBar from '@/components/dashboard/common/page/title-bar/page';

export const metadata = { title: `Section | Dashboard | ${config.site.name}` } satisfies Metadata;

const SectionsPage: React.FC = () => {
  return (
    <PageLayout>
      <PageTitleBar title="Section" />
      <PageTabs pageName="Section" tabs={SectionsPageTab} />
    </PageLayout>
  );
};

export default SectionsPage;
