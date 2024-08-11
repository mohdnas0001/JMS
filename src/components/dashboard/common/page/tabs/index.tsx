'use client';

import React, { useState, type FC } from 'react';
import { Box } from '@mui/material';

import PageBreadcrumbs from '../breadcrumbs';
import PageNavBar from '../nav-bar';
import PageNavItem from '../nav-item';

interface Tab {
  title: string;
  component: React.FC;
}

interface PageTabsProps {
  pageName: string;
  tabs: Tab[];
}

const PageTabs: FC<PageTabsProps> = ({ pageName, tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (tabNumber: number) => {
    setActiveTab(tabNumber);
  };

  return (
    <>
      <PageNavBar>
        {tabs.map((tab, index) => (
          <Box
            key={tab.title}
            onClick={() => {
              handleTabClick(index);
            }}
          >
            <PageNavItem name={tab.title} isActive={activeTab === index} isLastItem={index === tabs.length - 1} />
          </Box>
        ))}
      </PageNavBar>
      {tabs.map(
        (tab, index) =>
          activeTab === index && (
            <Box key={tab.title}>
              <PageBreadcrumbs page={pageName} tab={tab.title} />
              <tab.component />
            </Box>
          )
      )}
    </>
  );
};

export default PageTabs;
