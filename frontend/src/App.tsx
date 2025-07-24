import React, { useState } from 'react';
import { Box, Button, Step, StepLabel, Stepper, Typography, Container, Paper } from '@mui/material';
import PersonalInfoStep from './components/PersonalInfoStep';
import ContactInfoStep from './components/ContactInfoStep';
import BankingInfoStep from './components/BankingInfoStep';
import DocumentUploadStep from './components/DocumentUploadStep';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';

const steps = ['Personal Info', 'Contact Info', 'Banking Info', 'Upload Document'];

export default function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { control, handleSubmit } = useForm();

  const onSubmit: SubmitHandler<any> = async (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    if (activeStep === steps.length - 1) {
      // Final step: submit to backend
      setLoading(true);
      setError(null);
      try {
        const form = new FormData();
        Object.entries({ ...formData, ...data }).forEach(([key, value]) => {
          if (key === 'document' && value) {
            form.append('document', value as File);
          } else if (value !== undefined) {
            form.append(key, value as string);
          }
        });
        await axios.post('/api/transfers', form, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setActiveStep((prev) => prev + 1);
      } catch (err: any) {
        setError(err?.response?.data?.message || 'Submission failed.');
      } finally {
        setLoading(false);
      }
    } else {
      setActiveStep((prev) => prev + 1);
    }
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
        {error && <Typography color="error" align="center">{error}</Typography>}
        {loading && <Typography align="center">Submitting...</Typography>}
      </Paper>
    </Container>
  );
}
