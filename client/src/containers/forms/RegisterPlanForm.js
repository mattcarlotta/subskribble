import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { AntStepFormButtons } from '../app/formFields/antReduxFormFields';
import RenderPlanSelection from '../app/formFields/renderPlanSelection';
import ReviewPlanForm from '../app/formFields/reviewPlanForm';
import RenderFormFields from './renderFormFields';

const RegisterPlanForm = ({
  BILLINGADDRESSFIELDS,
  confirmLoading,
  CONTACTFIELDS,
  CREDITCARDFIELDS,
  handleSubmit,
  editStep,
  finished,
  mainTitle,
  onClickBack,
  pristine,
  plans,
  showContactInfo,
  showPlans,
  submitting,
}) => (
  <div className="form-container">
    {mainTitle && <h2 className="main-title"> {mainTitle}</h2>}
    <form onSubmit={handleSubmit}>
      {showContactInfo && (
        <div className="contact-container">
          <RenderFormFields
            fields={CONTACTFIELDS}
            title="Contact Information"
          />
          <RenderFormFields
            billingSwitch
            fields={BILLINGADDRESSFIELDS}
            title="Billing Information"
          />
          <RenderFormFields
            fields={CREDITCARDFIELDS}
            title="Credit Card Information"
          />
        </div>
      )}
      {showPlans && <RenderPlanSelection PLANSELECTIONFIELDS={plans} />}
      {finished && (
        <ReviewPlanForm editStep={editStep} PLANSELECTIONS={plans} />
      )}
      <div className="clear-fix" />
      <hr />
      <AntStepFormButtons
        backLabel="Back"
        backStyle={{ height: 50 }}
        column={12}
        confirmLoading={confirmLoading}
        onClickBack={onClickBack}
        pristine={pristine}
        submitLabel={finished ? 'Subscribe' : 'Next'}
        type={finished ? 'submit' : 'button'}
        submitStyle={{ height: 50, float: 'right' }}
        submitting={submitting}
      />
    </form>
  </div>
);

export default reduxForm({
  form: 'CustomerPlanSignup',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  initialValues: { creditCardExpMonth: 'Exp. Month' },
})(RegisterPlanForm);

RegisterPlanForm.propTypes = {
  BILLINGADDRESSFIELDS: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  confirmLoading: PropTypes.bool.isRequired,
  CONTACTFIELDS: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  CREDITCARDFIELDS: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  handleSubmit: PropTypes.func.isRequired,
  editStep: PropTypes.func.isRequired,
  finished: PropTypes.bool,
  mainTitle: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  onClickBack: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  plans: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  showContactInfo: PropTypes.bool,
  showPlans: PropTypes.bool,
  submitting: PropTypes.func.isRequired,
};
