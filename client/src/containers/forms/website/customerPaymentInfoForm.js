import map from 'lodash/map';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

import { isRequired, isValidZip } from '../formfields/validateFormFields';
import SubmitButton from '../formfields/renderSubmitButton';
import BackButton from '../formfields/renderBackButton';

const RIGHTFIELDS = [
  { name: "creditCard", label: "Credit Card", validate: [isRequired] },
  { name: "creditExpMonth", label: "Month", validate: [isRequired] },
  { name: "creditExpYear", label: "Year", validate: [isRequired] },
  { name: "creditCVC", label: "CVC", validate: [isRequired] },
]

const CustomerPaymentInfoForm = ({ handleSubmit, onClickBackButton, onSubmit, submitting }) => {
  return (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="right-form">
              <h3>Address</h3>
              <div className="input-75 f-l">
                <Field
                  name="address"
                  type="text"
                  component={TextField}
                  floatingLabelText="Address"
                  style={{ fontSize: 15, width: '95%' }}
                  validate={[isRequired]}
                />
              </div>
              <div className="input-25 f-r">
                <Field
                  name="unit"
                  type="text"
                  component={TextField}
                  floatingLabelText="Unit, Apt, or Suite #"
                  style={{ fontSize: 15, width: '100%' }}
                />
              </div>
              <div className="input-50 f-l">
                <Field
                  name="city"
                  type="text"
                  component={TextField}
                  floatingLabelText="City"
                  style={{ fontSize: 15, width: '95%' }}
                  validate={[isRequired]}
                />
              </div>
              <div className="input-25 f-l">
                <Field
                  name="state"
                  type="text"
                  component={TextField}
                  floatingLabelText="State"
                  style={{ fontSize: 15, width: '90%' }}
                  validate={[isRequired]}
                />
              </div>
              <div className="input-25 f-r">
                <Field
                  name="zip"
                  type="text"
                  component={TextField}
                  floatingLabelText="Zip"
                  style={{ fontSize: 15, width: '100%' }}
                  validate={[isRequired, isValidZip]}
                />
              </div>
            </div>
            <div className="right-form">
              <h3>Credit Card Information</h3>
              <div className="input-6">
                {
                  map(RIGHTFIELDS, ({ name, label, validate, normalize}, key) => {
                    return (
                      <div key={key} className="input-container">
                        <Field
                          name={name}
                          type="text"
                          component={TextField}
                          floatingLabelText={label}
                          style={{ fontSize: 15, width: '100%' }}
                          validate={validate}
                          normalize={normalize}
                        />
                      </div>
                    )
                  })
                }
              </div>
            </div>
          <div className="clear-fix" />
          <hr />
          <BackButton
            label="Back"
            onClick={onClickBackButton}
            backgroundColor={'#03a9f3'}
            buttonStyle={{ border: '2px solid transparent', borderRadius: 5 }}
            labelStyle={{ color: '#fff', fontSize: 15, fontFamily: "'Raleway Regular', Verdana, Helvetica, Arial, sans-serif", letterSpacing: 1 }}
            style={{ height: 50, marginTop: 15, borderRadius: 6, float: 'left' }}
          />
          <SubmitButton
            label="Next"
            submitting={submitting}
            backgroundColor={'#03a9f3'}
            fullWidth={false}
            buttonStyle={{ border: '2px solid transparent', borderRadius: 5 }}
            labelStyle={{ color: '#fff', fontSize: 15, fontFamily: "'Raleway Regular', Verdana, Helvetica, Arial, sans-serif", letterSpacing: 1 }}
            style={{ height: 50, marginTop: 15, borderRadius: 6, float: 'right' }}
          />
        </form>
      </div>
  );
};

export default reduxForm({ form: 'CustomerPaymentInfoForm', destroyOnUnmount: false })(CustomerPaymentInfoForm);
