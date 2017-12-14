import map from 'lodash/map';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

import { ADDRESSFIELDS, CONTACTFIELDS } from '../formfields/customerSignupFields';
import SubmitButton from '../formfields/renderSubmitButton';

const CustomerContactInfoForm = ({ handleSubmit, onSubmit, submitting }) => {
  return (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
          <div className="left-form">
            <h3>Contact Information</h3>
            <div className="input-75">
              {
                map(CONTACTFIELDS, ({ className, name, label, validate, normalize}, key) => {
                  return (
                    <div key={key} className={className}>
                      <Field
                        name={name}
                        type="text"
                        component={TextField}
                        floatingLabelText={label}
                        style={{ fontSize: 15, width: '95%'}}
                        validate={validate}
                        normalize={normalize}
                      />
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className="right-form">
            <h3>Address</h3>
            <div className="input-75">
            {
              map(ADDRESSFIELDS, ({ className, name, label, width, validate, normalize }, key) => {
                return (
                  <div key={key} className={className}>
                    <Field
                      name={name}
                      type="text"
                      component={TextField}
                      floatingLabelText={label}
                      style={{ fontSize: 15, width: `${width}` }}
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

export default reduxForm({ form: 'CustomerContactForm', destroyOnUnmount: false })(CustomerContactInfoForm);
