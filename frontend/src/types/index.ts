// frontend/src/types/index.ts

export interface RecipientInfo {
    name: string;
    phoneNumber: string;
    address: string;
    bankName: string;
    bankAccountNumber: string;
    routingNumber?: string; // optional
}

export interface FormData {
    recipient: RecipientInfo;
    amount: number;
    supportingDocument: File | null; // file upload
}

export interface ValidationErrors {
    recipientName?: string;
    phoneNumber?: string;
    address?: string;
    bankName?: string;
    bankAccountNumber?: string;
    routingNumber?: string;
    amount?: string;
    supportingDocument?: string;
}

export type Step = 'recipient' | 'amount' | 'document'; // steps in the multi-step form

export interface UseFormSteps {
    currentStep: Step;
    nextStep: () => void;
    previousStep: () => void;
    isLastStep: boolean;
}