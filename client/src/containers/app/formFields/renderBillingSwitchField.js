import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { AntSwitchField } from './antReduxFormFields';
import {
  resetBillingFieldValues,
  setBillingFieldValues,
} from '../../../actions/formActions';

const CustomerSwitchField = ({
  resetBillingFieldValues,
  sameBillingAddress,
  setBillingFieldValues,
}) => (
  <AntSwitchField
    checked={sameBillingAddress}
    label="Same As Address"
    formItemClassName="billing-switch-field"
    name="sameBillingAddress"
    onChange={(e, index, value) =>
      !value ? setBillingFieldValues() : resetBillingFieldValues()
    }
    value={sameBillingAddress}
  />
);

export default connect(
  state => ({
    sameBillingAddress: formValueSelector('CustomerPlanSignup')(
      state,
      'sameBillingAddress',
    ),
  }),
  { resetBillingFieldValues, setBillingFieldValues },
)(CustomerSwitchField);

CustomerSwitchField.propTypes = {
  resetBillingFieldValues: PropTypes.func.isRequired,
  sameBillingAddress: PropTypes.bool,
  setBillingFieldValues: PropTypes.func.isRequired,
};
