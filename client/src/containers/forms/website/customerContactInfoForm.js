import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

import { isRequired, isValidEmail } from '../formfields/validateFormFields';
import FormatPhone from '../formfields/formatPhoneField';
import SubmitButton from '../formfields/renderSubmitButton';

const CustomerContactInfoForm = ({ handleSubmit, onSubmit, submitting }) => {
  return (
    <div className="new-form-container">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <Field
            name="firstName"
            type="text"
            component={TextField}
            floatingLabelText="First Name"
            style={{ fontSize: 15, width: '100%' }}
            validate={[isRequired]}
          />
        </div>
        <div className="input-container">
          <Field
            name="lastName"
            type="text"
            component={TextField}
            floatingLabelText="Last Name"
            style={{ fontSize: 15, width: '100%' }}
            validate={[isRequired]}
          />
        </div>
        <div className="input-container">
          <Field
            name="name"
            type="email"
            component={TextField}
            floatingLabelText="Email Address"
            style={{ fontSize: 15, width: '100%' }}
            validate={[isRequired, isValidEmail]}
          />
        </div>
        <div className="input-container">
          <Field
            name="phone"
            type="text"
            component={TextField}
            floatingLabelText="Phone Number (optional)"
            style={{ fontSize: 15, width: '100%' }}
            normalize={FormatPhone}
          />
        </div>
        <SubmitButton
          label="Next"
          submitting={submitting}
          backgroundColor={'#03a9f3'}
          buttonStyle={{ border: '2px solid transparent', borderRadius: 5 }}
          labelStyle={{ color: '#fff', fontSize: 15, fontFamily: "'Raleway Regular', Verdana, Helvetica, Arial, sans-serif", letterSpacing: 1 }}
          style={{ display: 'inline-block', height: 50, marginTop: 15, borderRadius: 6 }}
        />
      </form>
    </div>
  );
};

export default reduxForm({ form: 'RegisterPlanForm' })(CustomerContactInfoForm);
