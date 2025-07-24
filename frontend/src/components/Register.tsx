import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Alert, MenuItem } from '@mui/material';
import axios from 'axios';

const Register = ({ onRegister }: { onRegister: (user: any) => void }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('USER');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('/api/auth/register', { name, email, password, role });
      onRegister(res.data.user);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', mt: 6 }}>
      <Typography variant="h5" mb={2}>Register</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField label="Name" value={name} onChange={e => setName(e.target.value)} fullWidth margin="normal" required />
      <TextField label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} fullWidth margin="normal" required />
      <TextField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} fullWidth margin="normal" required />
      <TextField select label="Role" value={role} onChange={e => setRole(e.target.value)} fullWidth margin="normal">
        <MenuItem value="USER">User</MenuItem>
        <MenuItem value="ADMIN">Admin</MenuItem>
      </TextField>
      <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading} sx={{ mt: 2 }}>
        {loading ? 'Registering...' : 'Register'}
      </Button>
    </Box>
  );
};

export default Register;
