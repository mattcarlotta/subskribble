import map from 'lodash/map';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

import { ADDRESSFIELDS, CONTACTFIELDS } from '../formfields/customerSignupFields';
import Button from '../formfields/renderFormButton';

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
          <Button
            backgroundColor="#03a9f3"
            floatStyle="right"
            height={50}
            fullWidth={false}
            label="Next"
            submitting={submitting}
            type="submit"
          />
        </form>
      </div>
  );
};

export default reduxForm({ form: 'CustomerContactForm', destroyOnUnmount: false })(CustomerContactInfoForm);
