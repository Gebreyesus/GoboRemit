import React, { useState } from 'react';
import { Box, Button, Step, StepLabel, Stepper, Typography, Container, Paper } from '@mui/material';
import PersonalInfoStep from './components/PersonalInfoStep';
import ContactInfoStep from './components/ContactInfoStep';
import BankingInfoStep from './components/BankingInfoStep';
import DocumentUploadStep from './components/DocumentUploadStep';
import { useForm, SubmitHandler } from 'react-hook-form';

const steps = ['Personal Info', 'Contact Info', 'Banking Info', 'Upload Document'];

export default function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const { control, handleSubmit } = useForm();

  const onSubmit: SubmitHandler<any> = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    handleNext();
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setFormData({});
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          GoboRemit Transfer Request
        </Typography>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <form onSubmit={handleSubmit(onSubmit)}>
          {activeStep === 0 && <PersonalInfoStep control={control} onNext={handleNext} defaultValues={formData} />}
          {activeStep === 1 && <ContactInfoStep control={control} onNext={handleNext} onBack={handleBack} defaultValues={formData} />}
          {activeStep === 2 && <BankingInfoStep control={control} onNext={handleNext} onBack={handleBack} defaultValues={formData} />}
          {activeStep === 3 && <DocumentUploadStep control={control} onNext={handleNext} onBack={handleBack} defaultValues={formData} />}
          {activeStep === steps.length && (
            <Box textAlign="center">
              <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
                All steps completed! Your request has been submitted.
              </Typography>
              <Button onClick={handleReset} variant="contained" color="primary">
                Reset
              </Button>
            </Box>
          )}
        </form>
      </Paper>
    </Container>
  );
}
