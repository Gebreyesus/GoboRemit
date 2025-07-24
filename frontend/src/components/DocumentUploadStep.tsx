import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';

interface Props {
  onNext: (data: any) => void;
  onBack: () => void;
  defaultValues?: any;
}

export default function DocumentUploadStep({ onNext, onBack, defaultValues }: Props) {
  const { handleSubmit, setValue, watch } = useForm({ defaultValues });
  const file = watch('document');
  const onDrop = (acceptedFiles: File[]) => {
    setValue('document', acceptedFiles[0], { shouldValidate: true });
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false });

  return (
    <form onSubmit={handleSubmit(onNext)}>
      <Box {...getRootProps()} sx={{ border: '2px dashed #ccc', p: 3, textAlign: 'center', mb: 2, cursor: 'pointer' }}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <Typography>Drop the file here ...</Typography>
        ) : file ? (
          <Typography>Selected file: {file.name}</Typography>
        ) : (
          <Typography>Drag 'n' drop proof of payment here, or click to select file</Typography>
        )}
      </Box>
      <Box mt={2} display="flex" justifyContent="space-between">
        <Button onClick={onBack}>Back</Button>
        <Button type="submit" variant="contained">Submit</Button>
      </Box>
    </form>
  );
}
