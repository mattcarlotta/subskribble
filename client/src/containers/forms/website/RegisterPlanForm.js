import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux'

import { AntFormFields, AntStepFormButtons } from '../formfields/antReduxFormFields';
import BillingSwitchField from '../formfields/renderBillingSwitchField';
import RenderPlanSelection from '../formfields/renderPlanSelection';
import ReviewPlanForm from '../formfields/reviewPlanForm';

const RenderFormFields = ({ billingSwitch, FIELDS, title, position, width }) => (
  FIELDS
  ? <div className={`${position}-form`}>
      <h3>{title}</h3>
      { billingSwitch && <BillingSwitchField /> }
      <div className={`input-${width}`}>
        <AntFormFields FIELDS={FIELDS} />
      </div>
    </div>
  : null
)

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
        <RenderFormFields billingSwitch={billingSwitch} FIELDS={LEFTFIELDS} title={leftTitle} position="left" width="95" />
        { PLANSELECTIONFIELDS && <RenderPlanSelection PLANSELECTIONFIELDS={PLANSELECTIONFIELDS} /> }
        { PLANSELECTIONS && <ReviewPlanForm editStep={editStep} PLANSELECTIONS={PLANSELECTIONS} /> }
        <RenderFormFields FIELDS={RIGHTFIELDS} title={rightTitle} position="right" width="100" />
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
  state => ({ initialValues: { creditCardExpMonth: 'Exp. Month' } })
)(RegisterPlanForm)
