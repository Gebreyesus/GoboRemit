import { z } from 'zod';

// Define a schema for validating personal information
export const personalInfoSchema = z.object({
  recipientName: z.string().min(1, 'Recipient name is required'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits').max(15, 'Phone number must be at most 15 digits'),
  address: z.string().min(1, 'Address is required'),
});

// Define a schema for validating banking information
export const bankingInfoSchema = z.object({
  bankName: z.string().min(1, 'Bank name is required'),
  accountNumber: z.string().min(1, 'Bank account number is required'),
  routingNumber: z.string().optional().min(1, 'Routing number is required if provided'),
});

// Define a schema for validating supporting documents
export const documentSchema = z.object({
  proofOfPayment: z.instanceof(File).refine(file => file.size > 0, 'File is required'),
});

// Export a function to validate the entire form
export const validateForm = (data) => {
  const personalInfoValidation = personalInfoSchema.safeParse(data.personalInfo);
  const bankingInfoValidation = bankingInfoSchema.safeParse(data.bankingInfo);
  const documentValidation = documentSchema.safeParse(data.document);

  return {
    personalInfo: personalInfoValidation,
    bankingInfo: bankingInfoValidation,
    document: documentValidation,
  };
};