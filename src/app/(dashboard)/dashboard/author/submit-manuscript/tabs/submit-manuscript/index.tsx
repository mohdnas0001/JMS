'use client';

import React, { useState } from 'react';
import { submitManuscript } from '@/api/manuscript';
import { Box, Step, StepLabel, Stepper, Typography } from '@mui/material';
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
          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
        ) : (
          <Box>{getStepContent(activeStep)}</Box>
        )}
      </Box>
    </FormProvider>
  );
};

export default MultiStepForm;
