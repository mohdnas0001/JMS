'use client';

import React, { useState } from 'react';
import { submitManuscript } from '@/api/manuscript';
import { Box, Button, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

import ContactInfoStep from '../../components/contact-info';
import FileUploadStep from '../../components/files-upload';
import ManuscriptInfoStep from '../../components/manuscript-info';

const steps = ['Contact Information', 'File Uploads', 'Manuscript Information'];

const MultiStepForm: React.FC = () => {
  const methods = useForm();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (data: any) => {
    console.log('Form Submitted:', data);
    try {
      const response = await submitManuscript(data);
      console.log('Manuscript submitted successfully:', response);
      setActiveStep((prevStep) => prevStep + 1);
    } catch (error) {
      console.error('Error submitting manuscript:', error.message);
    }
  };

  const getStepContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return <ContactInfoStep handleNext={handleNext} />;
      case 1:
        return <FileUploadStep handleSubmit={handleNext} handleBack={handleBack} />;
      case 2:
        return <ManuscriptInfoStep handleSubmit={methods.handleSubmit(handleSubmit)} handleBack={handleBack} />;
      default:
        return 'Unknown step';
    }
  };

  return (
    <FormProvider {...methods}>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
  <Box sx={{ textAlign: 'center', mt: 4 }}>
    <Typography variant="h6" sx={{ mb: 2 }}>
      Your submission is complete!
    </Typography>
    <Typography variant="body1" sx={{ mb: 3 }}>
      Thank you for submitting your manuscript. We have received your information and will get back to you soon.
    </Typography>
    <Button variant="contained" color="primary" onClick={() => setActiveStep(0)}>
      Submit Another Manuscript
    </Button>
  </Box>
) : (
  <Box>{getStepContent(activeStep)}</Box>
)}
      </Box>
    </FormProvider>
  );
};

export default MultiStepForm;
