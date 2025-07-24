import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, TextField } from '@mui/material';

interface Props {
  onNext: (data: any) => void;
  onBack: () => void;
  defaultValues?: any;
}

export default function ContactInfoStep({ onNext, onBack, defaultValues }: Props) {
  const { register, handleSubmit } = useForm({ defaultValues });
  return (
    <form onSubmit={handleSubmit(onNext)}>
      <TextField label="Phone Number" fullWidth margin="normal" {...register('phone', { required: true })} />
      <TextField label="Address" fullWidth margin="normal" {...register('address', { required: true })} />
      <Box mt={2} display="flex" justifyContent="space-between">
        <Button onClick={onBack}>Back</Button>
        <Button type="submit" variant="contained">Next</Button>
      </Box>
    </form>
  );
}
