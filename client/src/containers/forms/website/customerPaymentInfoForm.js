import map from 'lodash/map';
import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { Toggle, TextField, SelectField } from 'redux-form-material-ui';
import MenuItem from 'material-ui/MenuItem';

import { isRequired } from '../formfields/validateFormFields';
import { formatCreditCard, formatCVC, formatYear } from '../formfields/formatFields';

import { ADDRESSFIELDS } from '../formfields/customerSignupFields';
import Button from '../formfields/renderFormButton';

const MENUITEMS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

class CustomerPaymentInfoForm extends Component {
  initializeBillingForm = () => {
    this.props.initialize({
      billingAddress: this.props.billingAddress,
      billingUnit: this.props.billingUnit,
      billingCity: this.props.billingCity,
      billingState: this.props.billingState,
      billingZip: this.props.billingZip
    })
  }

  render() {
    const { handleSubmit, onClickBackButton, sameAddressToggle, submitting } = this.props;
    return (
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="left-form">
            <h3>Billing Address</h3>
            <Field
              name="sameAddressToggle"
              component={Toggle}
              label="Same As Address"
              labelPosition="right"
              onClick={!sameAddressToggle ? this.initializeBillingForm : () => this.props.destroy() }
            />
            <div className="input-66">
              {
                map(ADDRESSFIELDS, ({ className, name, label, width, validate, normalize }, key) => {
                  return (
                    <div key={key} className={className}>
                      <Field
                        name={`billing${name.charAt(0).toUpperCase() + name.slice(1)}`}
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
                  name="cc"
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
                  name="ccExpMonth"
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
                    name="ccExpYear"
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
                    name="ccCVC"
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
          <Button
            backgroundColor="#03a9f3"
            floatStyle="left"
            height={50}
            label="Back"
            onClick={onClickBackButton}
          />
          <Button
            backgroundColor="#03a9f3"
            label="Next"
            fullWidth={false}
            floatStyle="right"
            height={50}
            submitting={submitting}
            type="submit"
          />
        </form>
      </div>
    );
  }
};

const contactFormSelector = formValueSelector('CustomerContactForm');
const paymentFormSelector = formValueSelector('CustomerPaymentForm');

const mapStateToProps = state => {
	return {
		billingAddress: contactFormSelector(state, 'address'),
		billingUnit: contactFormSelector(state, 'unit'),
		billingCity: contactFormSelector(state, 'city'),
    billingState: contactFormSelector(state, 'state'),
    billingZip: contactFormSelector(state, 'zip'),
    sameAddressToggle: paymentFormSelector(state, 'sameAddressToggle')
	};
};

export default reduxForm({form: 'CustomerPaymentForm', destroyOnUnmount: false, enableReinitialize: true, keepDirtyOnReinitialize: true })(connect(mapStateToProps)(CustomerPaymentInfoForm));
