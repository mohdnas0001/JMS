import { type FC } from 'react';
import { Box, Typography } from '@mui/material';

interface PageTitleBarProps {
  title: string;
}

const PageTitleBar: FC<PageTitleBarProps> = ({ title }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        paddingTop: '8px',
        paddingBottom: '15px',
        alignItems: 'center',
        background: 'white',
        marginX: '-30px',
        paddingX: '30px',
        marginTop: '-10px',
        borderBottom: '1px solid #E7E7E7',
      }}
    >
      <Typography variant="h3">{title}</Typography>
    </Box>
  );
};

export default PageTitleBar;
