import { Box } from '@mui/material';

const PageNavBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        color: '#344054',
        fontWeight: 'bold',
        bgcolor: 'white',
        marginX: '-30px',
        paddingX: '30px',
        paddingBottom: '15px',
        paddingTop: '15px',
        alignItems: 'center',
        overflow: 'scroll',
      }}
    >
      {children}
    </Box>
  );
};

export default PageNavBar;
