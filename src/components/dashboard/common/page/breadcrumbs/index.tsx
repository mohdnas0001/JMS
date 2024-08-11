import { FC } from 'react';
import { ChevronRightSharp } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

interface PageBreadcrumbsProps {
  page: string;
  tab: string;
}

const PageBreadcrumbs: FC<PageBreadcrumbsProps> = ({ page, tab }) => {
  return (
    <Box style={{ marginBottom: '4px', marginTop: '4px' }}>
      <Typography sx={{ display: 'inline-block', verticalAlign: 'middle' }}>{page}</Typography>
      <ChevronRightSharp
        style={{
          fontSize: '20px',
          display: 'inline-block',
          verticalAlign: 'middle',
          fillOpacity: '0.56',
        }}
      />
      <Typography sx={{ display: 'inline-block', verticalAlign: 'middle', fontWeight: 500 }}>{tab}</Typography>
    </Box>
  );
};

export default PageBreadcrumbs;
