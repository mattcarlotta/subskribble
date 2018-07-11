import React from 'react';
import { Col } from 'antd'
import { reduxForm } from 'redux-form';
import { AntFormFields, AntStepFormButtons } from '../app/formFields/antReduxFormFields';
import BillingSwitchField from '../app/formFields/renderBillingSwitchField';
import RenderPlanSelection from '../app/formFields/renderPlanSelection';
import ReviewPlanForm from '../app/formFields/reviewPlanForm';

const RenderFormFields = ({ billingSwitch, FIELDS, title, position }) => (
  FIELDS
  ? <Col span={12}>
      <h3>{title} { billingSwitch && <BillingSwitchField /> }</h3>
      <div className="input-100">
        <AntFormFields FIELDS={FIELDS} />
      </div>
    </Col>
  : null
)

const RegisterPlanForm = ({
  BILLINGADDRESSFIELDS,
  billingSwitch,
  confirmLoading,
  CONTACTFIELDS,
  CREDITCARDFIELDS,
  handleSubmit,
  editStep,
  finished,
  leftTitle,
  mainTitle,
  onClickBack,
  onSubmit,
  pristine,
  plans,
  PLANSELECTIONFIELDS,
  PLANSELECTIONS,
  RIGHTFIELDS,
  rightTitle,
  showPlans,
  submitting,
}) => (
  <div className="form-container">
    <h2 className="main-title" dangerouslySetInnerHTML={{__html: mainTitle}}></h2>
    <form onSubmit={handleSubmit}>
      <RenderFormFields FIELDS={CONTACTFIELDS} title="Contact Information" />
      <RenderFormFields billingSwitch={true} FIELDS={BILLINGADDRESSFIELDS} title="Billing Information" />
      <RenderFormFields FIELDS={CREDITCARDFIELDS} title="Credit Card Information" />
      { showPlans && <RenderPlanSelection PLANSELECTIONFIELDS={plans} /> }
      { finished && <ReviewPlanForm editStep={editStep} PLANSELECTIONS={plans} /> }
      <div className="clear-fix" />
      <hr />
      <AntStepFormButtons
        backLabel="Back"
        backStyle={{ height: 50 }}
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
