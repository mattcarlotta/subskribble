import map from 'lodash/map';
import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { Toggle, TextField, SelectField } from 'redux-form-material-ui';
import MenuItem from 'material-ui/MenuItem';

import { isRequired } from '../formfields/validateFormFields';
import { formatCreditCard, formatCVC, formatYear } from '../formfields/formatFields';

import { ADDRESSFIELDS } from '../formfields/customerSignupFields';
import SubmitButton from '../formfields/renderSubmitButton';
import BackButton from '../formfields/renderBackButton';
const MENUITEMS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

class CustomerPaymentInfoForm extends Component {
  initializeBillingForm = () => {
    const { billingAddress, billingUnit, billingCity, billingState, billingZip } = this.props;
    this.props.initialize({ billingAddress, billingUnit, billingCity, billingState, billingZip })
  }

  resetBillingForm = () => {
    this.props.initialize({ billingAddress: '', billingUnit: '', billingCity: '', billingState: '', billingZip: '' })
  }

  render() {
    const { handleSubmit, onClickBackButton, sameAddress, submitting } = this.props;
    return (
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="left-form">
            <h3>Billing Address</h3>
            <Field
              name="sameAddress"
              component={Toggle}
              label="Same As Address"
              labelPosition="right"
              onClick={!sameAddress ? this.initializeBillingForm : this.resetBillingForm }
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
  }
};

const selector = formValueSelector('CustomerContactForm');
const selector2 = formValueSelector('CustomerPaymentForm');

const mapStateToProps = state => {
	return {
		billingAddress: selector(state, 'address'),
		billingUnit: selector(state, 'unit'),
		billingCity: selector(state, 'city'),
    billingState: selector(state, 'state'),
    billingZip: selector(state, 'zip'),
    sameAddress: selector2(state, 'sameAddress')
	};
};

export default reduxForm({form: 'CustomerPaymentForm', destroyOnUnmount: false, enableReinitialize: true })(connect(mapStateToProps)(CustomerPaymentInfoForm));
