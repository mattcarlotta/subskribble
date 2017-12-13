import map from 'lodash/map';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

import { isRequired, isValidEmail, isValidZip } from '../formfields/validateFormFields';
import FormatPhone from '../formfields/formatPhoneField';
import SubmitButton from '../formfields/renderSubmitButton';

const LEFTFIELDS = [
  { name: "firstName", label: "First Name", validate: [isRequired] },
  { name: "lastName", label: "Last Name", validate: [isRequired] },
  { name: "email", label: "Email Address", validate: [isRequired, isValidEmail] },
  { name: "phone", label: "Phone Number (optional)", normalize: FormatPhone },
]

// const RIGHTFIELDS = [
//   { name: "address", label: "Address", validate:  },
//   { name: "unit", label: "Unit, Apt, or Suite #" },
//   { name: "city", label: "City", validate: [isRequired] },
//   { name: "state", label: "State", validate: [isRequired] },
//   { name: "zip", label: "Zip Code", validate: [isRequired, isValidZip]},
// ]

const CustomerContactInfoForm = ({ handleSubmit, onSubmit, submitting }) => {
  return (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
          <div className="left-form">
            <h3>Contact Information</h3>
            {
              map(LEFTFIELDS, ({ name, label, validate, normalize}, key) => {
                return (
                  <Field
                    key={key}
                    name={name}
                    type="text"
                    component={TextField}
                    floatingLabelText={label}
                    style={{ fontSize: 15, width: '66%'}}
                    validate={validate}
                    normalize={normalize}
                  />
                )
              })
            }
          </div>
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
          <div className="clear-fix" />
          <hr />
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

export default reduxForm({ form: 'CustomerContactInfoForm', destroyOnUnmount: false })(CustomerContactInfoForm);
