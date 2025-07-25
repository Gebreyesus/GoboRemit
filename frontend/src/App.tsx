import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Login from './components/Login';
import Register from './components/Register';
import { Box, Button, Step, StepLabel, Stepper, Typography, Container, Paper } from '@mui/material';
import PersonalInfoStep from './components/PersonalInfoStep';
import ContactInfoStep from './components/ContactInfoStep';
import BankingInfoStep from './components/BankingInfoStep';
import DocumentUploadStep from './components/DocumentUploadStep';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';

const steps = ['Personal Info', 'Contact Info', 'Banking Info', 'Upload Document'];

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#181818',
      paper: '#232323',
    },
    primary: {
      main: '#00c853',
    },
    secondary: {
      main: '#fff',
    },
    text: {
      primary: '#fff',
      secondary: '#bdbdbd',
    },
  },
  typography: {
    fontFamily: 'Inter, Roboto, Arial, sans-serif',
  },
});

export default function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { handleSubmit } = useForm();

  // Auth state
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(true);

  const handleLogin = (user: any, token: string) => {
    setUser(user);
    setToken(token);
    setShowLogin(false);
  };
  const handleRegister = (user: any) => {
    setUser(user);
    setShowLogin(true);
  };
  const handleLogout = () => {
    setUser(null);
    setToken(null);
    setShowLogin(true);
  };

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
    <ThemeProvider theme={darkTheme}>
      <Container maxWidth="sm" sx={{ mt: 6 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          {!user ? (
            showLogin ? (
              <>
                <Login onLogin={handleLogin} />
                <Box textAlign="center" mt={2}>
                  <Button onClick={() => setShowLogin(false)} variant="text">Don't have an account? Register</Button>
                </Box>
              </>
            ) : (
              <>
                <Register onRegister={handleRegister} />
                <Box textAlign="center" mt={2}>
                  <Button onClick={() => setShowLogin(true)} variant="text">Already have an account? Login</Button>
                </Box>
              </>
            )
          ) : (
            <>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">Welcome, {user.name} ({user.role})</Typography>
                <Button onClick={handleLogout} variant="outlined" color="secondary">Logout</Button>
              </Box>
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
                {activeStep === 0 && <PersonalInfoStep onNext={handleNext} defaultValues={formData} />}
                {activeStep === 1 && <ContactInfoStep onNext={handleNext} onBack={handleBack} defaultValues={formData} />}
                {activeStep === 2 && <BankingInfoStep onNext={handleNext} onBack={handleBack} defaultValues={formData} />}
                {activeStep === 3 && <DocumentUploadStep onNext={handleNext} onBack={handleBack} defaultValues={formData} />}
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
            </>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
