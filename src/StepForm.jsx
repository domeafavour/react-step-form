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

export class StepFormClass extends React.Component {
  state = {
    step: this.props.defaultStep || 0,
    hasPrev: false,
    hasNext: true,
  };

  prev = () => this.setStep(this.state.step - 1);

  next = () => this.setStep(this.state.step + 1);

  getForms = () => this.props.children.filter(React.isValidElement);

  setStep = step => this.setState({ step });

  setHasPrev = hasPrev => this.setState({ hasPrev });

  setHasNext = hasNext => this.setState({ hasNext });

  getContext = () => {
    const { step, hasPrev, hasNext } = this.state;
    return {
      hasPrev,
      prev: this.prev,
      hasNext,
      next: this.next,
      step,
      setStep: this.setStep,
      length: this.getForms().length,
    };
  };

  componentDidUpdate(prevProps, prevState) {
    const { step } = this.state;
    if (prevState.step === step) {
      return;
    }
    this.setHasPrev(step > 0);
    this.setHasNext(step < this.getForms().length - 1);
  }

  render() {
    const context = this.getContext();

    return (
      <StepFormContext.Provider value={context}>
        {this.props.children.map((child, index) => {
          if (React.isValidElement(child)) {
            const formIndex = this.getForms().indexOf(child);
            return <div key={child.key || index} style={{ display: formIndex === this.state.step ? 'block' : 'none' }}>{child}</div>
          }
          if (typeof child === 'function') {
            return child(context);
          }
          return null;
        })}
      </StepFormContext.Provider>
    );
  }
}

export const withStepForm = WrappedComponent => class extends React.Component {
  static displayName = `withStepForm(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  render() {
    return (
      <StepFormContext.Consumer>
        {value => <WrappedComponent {...value} {...this.props} />}
      </StepFormContext.Consumer>
    );
  }
};

export default StepForm;