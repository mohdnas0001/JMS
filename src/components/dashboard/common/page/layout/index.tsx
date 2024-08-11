import React from 'react'; // Ensure React is imported
import { Box } from '@mui/material';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return <Box sx={{ paddingX: '5px' }}>{children}</Box>;
};

export default PageLayout;
