import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { AntSwitchField } from './antReduxFormFields';
import { resetBillingFieldValues, setBillingFieldValues } from '../../../actions/formActionCreators';

const CustomerSwitchField = ({ resetBillingFieldValues, sameBillingAddress, setBillingFieldValues }) => (
  <Fragment>
    <p style={{ margin: 0 }}>Same As Address</p>
    <AntSwitchField
      checked={sameBillingAddress}
      name="sameBillingAddress"
      onChange={(e, index, value ) => !value ? setBillingFieldValues() : resetBillingFieldValues()}
      value={sameBillingAddress}
    />
  </Fragment>
)

export default connect(state => ({
  sameBillingAddress: formValueSelector('CustomerPlanSignup')(state, 'sameBillingAddress') }),
  { resetBillingFieldValues, setBillingFieldValues })(CustomerSwitchField)
