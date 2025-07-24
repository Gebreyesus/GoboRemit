import React, { useState } from 'react';
import { useFormSteps } from '../hooks/useFormSteps';
import { validationSchema } from '../utils/validation';

const MultiStepForm: React.FC = () => {
    const { step, nextStep, prevStep } = useFormSteps();
    const [formData, setFormData] = useState({
        recipientName: '',
        phoneNumber: '',
        address: '',
        bankName: '',
        accountNumber: '',
        routingNumber: '',
        supportingDocument: null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData({ ...formData, supportingDocument: e.target.files[0] });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const isValid = validationSchema.validate(formData);
        if (isValid) {
            if (step < 3) {
                nextStep();
            } else {
                // Submit the form data to the server
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {step === 1 && (
                <div>
                    <label>
                        Recipient Name:
                        <input type="text" name="recipientName" value={formData.recipientName} onChange={handleChange} required />
                    </label>
                    <label>
                        Phone Number:
                        <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                    </label>
                    <button type="button" onClick={nextStep}>Next</button>
                </div>
            )}
            {step === 2 && (
                <div>
                    <label>
                        Address:
                        <input type="text" name="address" value={formData.address} onChange={handleChange} required />
                    </label>
                    <label>
                        Bank Name:
                        <input type="text" name="bankName" value={formData.bankName} onChange={handleChange} required />
                    </label>
                    <label>
                        Account Number:
                        <input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleChange} required />
                    </label>
                    <label>
                        Routing Number:
                        <input type="text" name="routingNumber" value={formData.routingNumber} onChange={handleChange} />
                    </label>
                    <button type="button" onClick={prevStep}>Back</button>
                    <button type="button" onClick={nextStep}>Next</button>
                </div>
            )}
            {step === 3 && (
                <div>
                    <label>
                        Supporting Document:
                        <input type="file" name="supportingDocument" onChange={handleFileChange} required />
                    </label>
                    <button type="button" onClick={prevStep}>Back</button>
                    <button type="submit">Submit</button>
                </div>
            )}
        </form>
    );
};

export default MultiStepForm;