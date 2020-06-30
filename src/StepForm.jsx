import React, { useState, useEffect, useCallback, useMemo } from 'react';

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

  return children.map((child, index) => {
    if (React.isValidElement(child)) {
      const formIndex = forms.indexOf(child);
      return <div key={child.key || index} style={{ display: formIndex === step ? 'block' : 'none' }}>{child}</div>
    }
    if (typeof child === 'function') {
      return child({ hasPrev, prev, hasNext, next, step, length: forms.length });
    }
    return null;
  });
};

export default StepForm;