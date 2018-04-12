import React from 'react';
import { reduxForm } from 'redux-form';
import { AntFormFields, AntStepFormButtons } from '../../formFields/antReduxFormFields';
import BillingSwitchField from '../../formFields/renderBillingSwitchField';
import RenderPlanSelection from '../../formFields/renderPlanSelection';
import ReviewPlanForm from '../../formFields/reviewPlanForm';

const RenderFormFields = ({ billingSwitch, FIELDS, title, position }) => (
  FIELDS
  ? <div className={`${position}-form`}>
      <h3>{title}</h3>
      { billingSwitch && <BillingSwitchField /> }
      <div className="input-100">
        <AntFormFields FIELDS={FIELDS} />
      </div>
    </div>
  : null
)

const RegisterPlanForm = ({
  billingSwitch,
  confirmLoading,
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
}) => (
  <div className="form-container">
    <h2 className="main-title" dangerouslySetInnerHTML={{__html: mainTitle}}></h2>
    <form onSubmit={handleSubmit}>
      <RenderFormFields FIELDS={LEFTFIELDS} title={leftTitle} position="left" />
      { PLANSELECTIONFIELDS && <RenderPlanSelection PLANSELECTIONFIELDS={PLANSELECTIONFIELDS} /> }
      { PLANSELECTIONS && <ReviewPlanForm editStep={editStep} PLANSELECTIONS={PLANSELECTIONS} /> }
      <RenderFormFields billingSwitch={billingSwitch} FIELDS={RIGHTFIELDS} title={rightTitle} position="right" />
      <div className="clear-fix" />
      <hr />
      <AntStepFormButtons
        backLabel="Back"
        backStyle={{ height: 50, float: 'left' }}
        confirmLoading={confirmLoading}
        onClickBack={onClickBack}
        pristine={pristine}
        submitLabel={ finished ? "Subscribe" : "Next" }
        submitStyle= {{ height: 50, float: 'right' }}
        submitting={submitting}
      />
    </form>
  </div>
);

export default reduxForm({
  form: 'CustomerPlanSignup',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  initialValues: { creditCardExpMonth: 'Exp. Month' }
})(RegisterPlanForm)
