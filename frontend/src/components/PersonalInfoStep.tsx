import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, TextField } from '@mui/material';

interface Props {
  onNext: (data: any) => void;
  defaultValues?: any;
}

export default function PersonalInfoStep({ onNext, defaultValues }: Props) {
  const { register, handleSubmit } = useForm({ defaultValues });
  return (
    <form onSubmit={handleSubmit(onNext)}>
      <TextField label="Recipient Name" fullWidth margin="normal" {...register('recipientName', { required: true })} />
      <Box mt={2} textAlign="right">
        <Button type="submit" variant="contained">Next</Button>
      </Box>
    </form>
  );
}
