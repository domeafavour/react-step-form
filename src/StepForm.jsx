import React, { useState, useEffect, useCallback, useMemo, useContext } from 'react';

const StepFormContext = React.createContext();

const StepForm = ({ children, defaultStep = 0 }) => {
  const forms = useMemo(() => children.filter(React.isValidElement), [children]);
  const [step, setStep] = useState(defaultStep);
  const [hasPrev, setHasPrev] = useState(false);
  const [hasNext, setHasNext] = useState(true);

  const prev = useCallback(() => setStep(index => index - 1), []);
  const next = useCallback(() => setStep(index => index + 1), []);

  useEffect(() => {
    setHasPrev(step > 0);
    setHasNext(step < forms.length - 1);
  }, [step, forms]);

  useEffect(() => {
    setStep(defaultStep);
  }, [defaultStep]);

  const context = {
    hasPrev,
    prev,
    hasNext,
    next,
    step,
    setStep,
    length: forms.length,
  };

  return (
    <StepFormContext.Provider value={context}>
      {children.map((child, index) => {
        if (React.isValidElement(child)) {
          const formIndex = forms.indexOf(child);
          return <div key={child.key || index} style={{ display: formIndex === step ? 'block' : 'none' }}>{child}</div>
        }
        if (typeof child === 'function') {
          return child(context);
        }
        return null;
      })}
    </StepFormContext.Provider>
  );
};

export const useStepForm = () => {
  return useContext(StepFormContext);
};

export default StepForm;