import map from 'lodash/map';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField, SelectField } from 'redux-form-material-ui';
import MenuItem from 'material-ui/MenuItem';

import { isRequired } from '../formfields/validateFormFields';
import { formatCreditCard, formatCVC, formatYear } from '../formfields/formatFields';

import { ADDRESSFIELDS } from '../formfields/customerSignupFields';
import SubmitButton from '../formfields/renderSubmitButton';
import BackButton from '../formfields/renderBackButton';
const MENUITEMS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

const CustomerPaymentInfoForm = ({ handleSubmit, onClickBackButton, onSubmit, submitting }) => {
  return (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="left-form">
              <h3>Billing Address</h3>
              <div className="input-66">
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
            <div className="right-form">
              <h3>Credit Card Information</h3>
              <div className="input-66">
                <div className="input-50 f-l">
                  <Field
                    name="creditCard"
                    type="text"
                    component={TextField}
                    floatingLabelText="Credit Card"
                    style={{ fontSize: 15, width: '95%' }}
                    validate={[isRequired]}
                    normalize={formatCreditCard}
                  />
                </div>
                <div className="input-16 f-l">
                  <Field
                    name="creditExpMonth"
                    type="text"
                    component={SelectField}
                    floatingLabelText="Month"
                    style={{ fontSize: 15, width: '90%' }}
                    validate={[isRequired]}
                  >
                    {
                      map(MENUITEMS, (value) => {
                        return <MenuItem key={value} value={value} primaryText={value} />
                      })
                    }
                  </Field>
                </div>
                <div className="input-16 f-l">
                  <Field
                    name="creditExpYear"
                    type="text"
                    component={TextField}
                    floatingLabelText="Exp Year"
                    hintText="YYYY"
                    style={{ fontSize: 15, width: '90%' }}
                    validate={[isRequired]}
                    normalize={formatYear}
                  />
                </div>
                <div className="input-16 f-l">
                  <Field
                    name="creditCVC"
                    type="text"
                    component={TextField}
                    floatingLabelText="CVC"
                    hintText="XXX"
                    style={{ fontSize: 15, width: '90%' }}
                    validate={[isRequired]}
                    normalize={formatCVC}
                  />
                </div>
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
