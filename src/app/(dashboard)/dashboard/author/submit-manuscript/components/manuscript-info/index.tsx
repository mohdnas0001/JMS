'use client';

import React from 'react';
import { Box, Button, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

interface ManuscriptInfoStepProps {
  handleSubmit: () => void;
  handleBack: () => void;
}

const ManuscriptInfoStep: React.FC<ManuscriptInfoStepProps> = ({ handleSubmit, handleBack }) => {
  const { control, handleSubmit: handleFormSubmit } = useFormContext();

  return (
    <Box component="form" noValidate autoComplete="off" sx={{ mt: 3 }} onSubmit={handleFormSubmit(handleSubmit)}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Manuscript Information
      </Typography>
      <Controller
        name="title"
        control={control}
        rules={{ required: 'Title is required' }}
        render={({ field, fieldState }) => (
          <TextField
            fullWidth
            label="Title"
            variant="outlined"
            margin="normal"
            multiline
            {...field}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="abstract"
        control={control}
        rules={{ required: 'Abstract is required' }}
        render={({ field, fieldState }) => (
          <TextField
            fullWidth
            label="Abstract"
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            {...field}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="keywords"
        control={control}
        rules={{ required: 'Keywords are required' }}
        render={({ field, fieldState }) => (
          <TextField
            fullWidth
            label="Keywords"
            variant="outlined"
            margin="normal"
            {...field}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="suggestedReviewer"
        control={control}
        rules={{ required: 'Suggested Reviewer  are required' }}
        render={({ field, fieldState }) => (
          <TextField
            fullWidth
            label="Suggested Reviewer"
            variant="outlined"
            margin="normal"
            {...field}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <Stack direction="row" justifyContent="space-between" sx={{ mt: 3 }}>
        <Button onClick={handleBack} variant="outlined">
          Back
        </Button>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Stack>
    </Box>
  );
};

export default ManuscriptInfoStep;
