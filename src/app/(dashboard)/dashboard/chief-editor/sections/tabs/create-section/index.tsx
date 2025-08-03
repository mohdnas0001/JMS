'use client';

import React, { useEffect, useState } from 'react';
import CreateSectionCard from '../../components/cards/create-section';
import { Box } from '@mui/material';



  
const CreateSectionsTab: React.FC = () => {
    return <>
    <Box sx={{ mt: '30px', mx: { xs: '20px', md: '100px' } }}>
      <Box>
        <CreateSectionCard />
      </Box>
    </Box>
    </>;
};

export default CreateSectionsTab;
