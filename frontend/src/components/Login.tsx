import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Alert, InputAdornment, IconButton, Paper } from '@mui/material';
import Logo from './Logo';
import axios from 'axios';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = ({ onLogin }: { onLogin: (user: any, token: string) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      onLogin(res.data.user, res.data.token);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'inherit' }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 4, maxWidth: 360, width: '100%', bgcolor: 'background.paper' }}>
        <Logo size={56} />
        <Typography variant="h5" align="center" mb={1} fontWeight={700}>
          Welcome to GoboRemit!
        </Typography>
        <Typography align="center" mb={3} color="text.secondary">
          Securely send and track your transfers
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} fullWidth margin="normal" required sx={{ borderRadius: 2 }} />
          <TextField label="Password" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} fullWidth margin="normal" required sx={{ borderRadius: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(v => !v)} edge="end" size="small">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading} sx={{ mt: 2, borderRadius: 2, fontWeight: 700 }}>
            {loading ? 'Logging in...' : 'LOGIN'}
          </Button>
        </Box>
        <Box textAlign="center" mt={2}>
          <Button variant="text" color="primary" size="small" sx={{ textTransform: 'none' }}>
            Forgot password?
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
