import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, TextField } from '@mui/material';

interface Props {
  onNext: (data: any) => void;
  onBack: () => void;
  defaultValues?: any;
}

export default function ContactInfoStep({ onNext, onBack, defaultValues }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues });
  return (
    <form onSubmit={handleSubmit(onNext)}>
      <TextField 
        label="Phone Number" 
        fullWidth 
        margin="normal" 
        {...register('phone', { required: 'Phone number is required', pattern: { value: /^\+?[0-9]{7,15}$/, message: 'Enter a valid phone number' } })}
        error={!!errors.phone}
        helperText={errors.phone?.message as string}
      />
      <TextField 
        label="Address" 
        fullWidth 
        margin="normal" 
        {...register('address', { required: 'Address is required' })}
        error={!!errors.address}
        helperText={errors.address?.message as string}
      />
      <Box mt={2} display="flex" justifyContent="space-between">
        <Button onClick={onBack}>Back</Button>
        <Button type="submit" variant="contained">Next</Button>
      </Box>
    </form>
  );
}
