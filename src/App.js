import React from 'react';
import StepForm, { useStepForm, StepFormClass, withStepForm } from './StepForm';
import './App.css';

const Form1 = () => {
  return (
    <div>
      <p>step1</p>
      <input defaultValue="1" />
    </div>
  );
};

const Form2 = () => {
  const { setStep, length } = useStepForm();

  return (
    <div>
      <p>step2</p>
      <input defaultValue="2" />
      can't wait, <button onClick={() => setStep(length - 1)}>finish</button>
    </div>
  );
};

const Thanks = () => {
  return (
    <div>
      <p>thanks.</p>
    </div>
  );
};

const Form5 = withStepForm(({ setStep, length }) => {
  return (
    <div>
      <p>form 5</p>
      <input defaultValue="5" />
      can't wait, <button onClick={() => setStep(length - 1)}>finish</button>
    </div>
  );
});

const buttons = ({ hasPrev, prev, hasNext, next, step, length }) => {
  return (
    <div key="buttons">
      <button disabled={!hasPrev} onClick={prev}>Prev</button>
      <button disabled={!hasNext} onClick={next}>Next</button>
      <div>---</div>
      <div>{step + 1}/{length}</div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <StepForm>
        {/* progress */}
        {({ step, length }) => {
          return (
            <div key="progress">
              <progress max={length} value={step + 1} />
            </div>
          );
        }}

        {/* form step 1 */}
        <Form1/>

        {/* form step 2 */}
        <Form2 />

        {/* form step 3 */}
        <div>
          <p>step3</p>
          <input defaultValue="3" />
        </div>

        {/* form step 4, finished. */}
        <Thanks/>

        {/* buttons */}
        {buttons}
      </StepForm>

      <StepFormClass>
        <Form1 />
        <Form5 />
        <Form2 />
        <Thanks />
        {buttons}
      </StepFormClass>
    </div>
  );
}

export default App;
