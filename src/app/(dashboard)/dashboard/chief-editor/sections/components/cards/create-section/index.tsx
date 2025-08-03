'use client';

import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { createSession } from '@/api/sections';
import { useSnackbar } from 'notistack';

const CreateSectionCard: React.FC = () => {
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createSession({
        name: categoryName,
      });

      enqueueSnackbar('Category created successfully!', { variant: 'success' });
      setCategoryName('');
    } catch (err) {
      // Define custom error handling logic here
      if (err instanceof Error) {
        switch (err.message) {
          case 'Network Error':
            enqueueSnackbar('Network error. Please check your connection and try again.', { variant: 'error' });
            break;
          case 'Unauthorized':
            enqueueSnackbar('You are not authorized to perform this action.', { variant: 'error' });
            break;
          case 'Validation Error':
            enqueueSnackbar('Please ensure the category name is valid.', { variant: 'warning' });
            break;
          default:
            enqueueSnackbar('Failed to create the category. Please try again.', { variant: 'error' });
        }
      } else {
        enqueueSnackbar('An unexpected error occurred.', { variant: 'error' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: '#fff' }}>
      <Typography variant="h6" gutterBottom>
        Create New Category
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Category Name"
          variant="outlined"
          fullWidth
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Category'}
        </Button>
      </form>
    </Box>
  );
};

export default CreateSectionCard;
