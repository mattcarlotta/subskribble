import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { AntSwitchField } from './antReduxFormFields';
import { resetBillingFieldValues, setBillingFieldValues } from '../../actions/formActions';

const CustomerSwitchField = ({ resetBillingFieldValues, sameBillingAddress, setBillingFieldValues }) => (
  <AntSwitchField
    checked={sameBillingAddress}
    label="Same As Address"
    formItemClassName="billing-switch-field"
    name="sameBillingAddress"
    onChange={(e, index, value ) => !value ? setBillingFieldValues() : resetBillingFieldValues()}
    value={sameBillingAddress}
  />
)

export default connect(state => ({
  sameBillingAddress: formValueSelector('CustomerPlanSignup')(state, 'sameBillingAddress') }),
  { resetBillingFieldValues, setBillingFieldValues })(CustomerSwitchField)
