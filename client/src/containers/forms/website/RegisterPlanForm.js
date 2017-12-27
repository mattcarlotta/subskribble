import React from 'react';
import { reduxForm } from 'redux-form';

import RenderFields from '../formfields/renderFields'
import RenderPlanSelection from '../formfields/renderPlanSelection';
import Button from '../formfields/renderFormButton';

const RegisterPlanForm = ({
  handleSubmit,
  LEFTFIELDS,
  leftTitle,
  onClickBack,
  PLANSELECTIONFIELDS,
  RIGHTFIELDS,
  rightTitle,
  submitting
}) => {
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        { LEFTFIELDS &&
          <div className="left-form">
            <h3>{leftTitle}s</h3>
            <div className="input-66">
              { RenderFields(LEFTFIELDS) }
            </div>
          </div>
        }
        { PLANSELECTIONFIELDS && <RenderPlanSelection PLANSELECTIONFIELDS={PLANSELECTIONFIELDS} /> }
        { RIGHTFIELDS &&
          <div className="right-form">
            <h3>{rightTitle}</h3>
            <div className="input-66">
              { RenderFields(RIGHTFIELDS) }
            </div>
          </div>
        }
        <div className="clear-fix" />
        <hr />
        { onClickBack &&
          <Button
            backgroundColor="#03a9f3"
            floatStyle="left"
            height={50}
            label="Back"
            onClick={onClickBack}
          />
        }
        <Button
          backgroundColor="#03a9f3"
          label="Next"
          fullWidth={false}
          floatStyle="right"
          height={50}
          submitting={submitting}
          type="submit"
        />
      </form>
    </div>
  );
};

export default reduxForm({ form: 'CustomerPlanSignup', destroyOnUnmount: false, enableReinitialize: true, keepDirtyOnReinitialize: true })(RegisterPlanForm);
