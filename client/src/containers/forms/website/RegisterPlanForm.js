import React from 'react';
import { reduxForm } from 'redux-form';

import RenderFields from '../formfields/renderFields'
import RenderPlanSelection from '../formfields/renderPlanSelection';
import ReviewPlanForm from '../formfields/reviewPlanForm';
import Button from '../formfields/renderFormButton';

const RegisterPlanForm = ({
  handleSubmit,
  FINALVALUES,
  finished,
  LEFTFIELDS,
  leftTitle,
  onClickBack,
  onSubmit,
  PLANSELECTIONFIELDS,
  PLANSELECTIONS,
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
            <div className="input-95">
              { RenderFields(LEFTFIELDS) }
            </div>
          </div>
        }
        { PLANSELECTIONFIELDS && <RenderPlanSelection PLANSELECTIONFIELDS={PLANSELECTIONFIELDS} /> }
        { FINALVALUES && <ReviewPlanForm FINALVALUES={FINALVALUES} PLANSELECTIONS={PLANSELECTIONS} /> }
        { RIGHTFIELDS &&
          <div className="right-form">
            <h3>{rightTitle}</h3>
            <div className="input-100">
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
          label={ finished ? "Subscribe" : "Next"}
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
