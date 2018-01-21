import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux'

import { AntFormFields, AntStepFormButtons } from '../formfields/antReduxFormFields';
import BillingSwitchField from '../formfields/renderBillingSwitchField';
import RenderPlanSelection from '../formfields/renderPlanSelection';
import ReviewPlanForm from '../formfields/reviewPlanForm';

let RegisterPlanForm = ({
  billingSwitch,
  handleSubmit,
  editStep,
  finished,
  LEFTFIELDS,
  leftTitle,
  mainTitle,
  onClickBack,
  onSubmit,
  pristine,
  PLANSELECTIONFIELDS,
  PLANSELECTIONS,
  RIGHTFIELDS,
  rightTitle,
  submitting,
}) => {
  return (
    <div className="form-container">
      <h2 className="main-title" dangerouslySetInnerHTML={{__html: mainTitle}}></h2>
      <form onSubmit={handleSubmit}>
        { LEFTFIELDS &&
          <div className="left-form">
            <h3>{leftTitle}</h3>
            { billingSwitch && <BillingSwitchField /> }
            <div className="input-95">
              <AntFormFields FIELDS={LEFTFIELDS} />
            </div>
          </div>
        }
        { PLANSELECTIONFIELDS && <RenderPlanSelection PLANSELECTIONFIELDS={PLANSELECTIONFIELDS} /> }
        { PLANSELECTIONS && <ReviewPlanForm editStep={editStep} PLANSELECTIONS={PLANSELECTIONS} /> }
        { RIGHTFIELDS &&
          <div className="right-form">
            <h3>{rightTitle}</h3>
            <div className="input-100">
              <AntFormFields FIELDS={RIGHTFIELDS} />
            </div>
          </div>
        }
        <div className="clear-fix" />
        <hr />
        <AntStepFormButtons
          backLabel="Back"
          backStyle={{ height: 50, float: 'left' }}
          onClickBack={onClickBack}
          pristine={pristine}
          submitLabel={ finished ? "Subscribe" : "Next" }
          submitStyle= {{ height: 50, float: 'right' }}
          submitting={submitting}
        />
      </form>
    </div>
  );
};

RegisterPlanForm = reduxForm({
  form: 'CustomerPlanSignup',
  destroyOnUnmount: false,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(RegisterPlanForm)

export default RegisterPlanForm = connect(
  state => ({ initialValues: { creditCardExpMonth: '01' } })
)(RegisterPlanForm)
