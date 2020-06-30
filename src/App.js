import React from 'react';
import StepForm from './StepForm';
import './App.css';

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
        <div>
          <p>step2</p>
          <input defaultValue="2" />
        </div>

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
