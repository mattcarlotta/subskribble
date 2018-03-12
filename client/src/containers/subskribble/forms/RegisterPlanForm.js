import React from 'react';
import { reduxForm } from 'redux-form';
import { AntFormFields, AntStepFormButtons } from '../../formfields/antReduxFormFields';
import BillingSwitchField from '../../formfields/renderBillingSwitchField';
import RenderPlanSelection from '../../formfields/renderPlanSelection';
import ReviewPlanForm from '../../formfields/reviewPlanForm';

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
};

export default reduxForm({
  form: 'CustomerPlanSignup',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  initialValues: { creditCardExpMonth: 'Exp. Month' }
})(RegisterPlanForm)
