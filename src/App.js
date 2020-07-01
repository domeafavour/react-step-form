import React from 'react';
import StepForm, { useStepForm } from './StepForm';
import './App.css';

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
        <div>
          <p>step1</p>
          <input defaultValue="1" />
        </div>

        {/* form step 2 */}
        <Form2 />

        {/* form step 3 */}
        <div>
          <p>step3</p>
          <input defaultValue="3" />
        </div>

        {/* form step 4, finished. */}
        <div>
          <p>thanks.</p>
        </div>

        {/* buttons */}
        {({ hasPrev, prev, hasNext, next, step, length }) => {
          return (
            <div key="buttons">
              <button disabled={!hasPrev} onClick={prev}>Prev</button>
              <button disabled={!hasNext} onClick={next}>Next</button>
              <div>---</div>
              <div>{step + 1}/{length}</div>
            </div>
          );
        }}
      </StepForm>
    </div>
  );
}

export default App;
