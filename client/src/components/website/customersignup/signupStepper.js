import map from 'lodash/map';
import React from 'react';
import { Step, Stepper, StepButton } from 'material-ui/Stepper';

const stepLabels = ['Contact Information', 'Payment', 'Plan', 'Review']

const SignupStepper = ({ editStep, stepIndex, visited, wasReviewed }) => (
  <Stepper>
    {map(stepLabels, (label, key) => {
      return (
        <Step key={label}>
          <StepButton
            completed={visited.indexOf(key+1) !== -1 }
            active={wasReviewed ? true : stepIndex === (key+1)}
            disableTouchRipple={!wasReviewed}
            className={wasReviewed ? "fix-cursor" : "" }
            onClick={wasReviewed ? editStep(key+1) : undefined}
            >
              {label}
          </StepButton>
        </Step>
      )
    })}
  </Stepper>
)

export default SignupStepper;
