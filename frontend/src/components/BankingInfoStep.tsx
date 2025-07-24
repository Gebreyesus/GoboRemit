import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, Button, TextField, Checkbox, FormControlLabel } from '@mui/material';

interface Props {
  onNext: (data: any) => void;
  onBack: () => void;
  defaultValues?: any;
}

export default function BankingInfoStep({ onNext, onBack, defaultValues }: Props) {
  const { register, handleSubmit, control, watch, formState: { errors } } = useForm({ defaultValues });
  const [showRouting, setShowRouting] = useState(!!defaultValues?.hasRouting);
  const hasRouting = watch('hasRouting', false);

  return (
    <form onSubmit={handleSubmit(onNext)}>
      <TextField 
        label="Bank Name" 
        fullWidth 
        margin="normal" 
        {...register('bankName', { required: 'Bank name is required' })}
        error={!!errors.bankName}
        helperText={errors.bankName?.message as string}
      />
      <TextField 
        label="Bank Account Number" 
        fullWidth 
        margin="normal" 
        {...register('accountNumber', { required: 'Account number is required' })}
        error={!!errors.accountNumber}
        helperText={errors.accountNumber?.message as string}
      />
      <FormControlLabel
        control={<Controller name="hasRouting" control={control} defaultValue={false} render={({ field }) => <Checkbox {...field} checked={field.value} onChange={e => { field.onChange(e.target.checked); setShowRouting(e.target.checked); }} />} />}
        label="Add Routing Number"
      />
      {hasRouting && (
        <TextField 
          label="Routing Number (optional)" 
          fullWidth 
          margin="normal" 
          {...register('routingNumber', { pattern: { value: /^[0-9]{9}$/i, message: 'Routing number must be 9 digits' } })}
          error={!!errors.routingNumber}
          helperText={errors.routingNumber?.message as string}
        />
      )}
      <Box mt={2} display="flex" justifyContent="space-between">
        <Button onClick={onBack}>Back</Button>
        <Button type="submit" variant="contained">Next</Button>
      </Box>
    </form>
  );
}
