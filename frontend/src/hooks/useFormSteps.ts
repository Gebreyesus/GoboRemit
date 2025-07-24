import { useState } from 'react';

const useFormSteps = (initialStep = 0) => {
    const [currentStep, setCurrentStep] = useState(initialStep);

    const nextStep = () => {
        setCurrentStep((prevStep) => prevStep + 1);
    };

    const prevStep = () => {
        setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
    };

    const resetSteps = () => {
        setCurrentStep(initialStep);
    };

    return {
        currentStep,
        nextStep,
        prevStep,
        resetSteps,
    };
};

export default useFormSteps;