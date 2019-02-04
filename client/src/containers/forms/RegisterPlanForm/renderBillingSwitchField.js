import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AntSwitchField } from '../../app/formFields/antReduxFormFields.js';
import {
  resetBillingFieldValues,
  setBillingFieldValues,
} from '../../../actions/formActions.js';

class CustomerSwitchField extends Component {
  state = {
    sameBillingAddress: false,
  };

  handleChange = () => {
    this.setState(prevState => {
      if (!prevState.sameBillingAddress) {
        this.props.setBillingFieldValues();
      } else {
        this.props.resetBillingFieldValues();
      }

      return {
        sameBillingAddress: !prevState.sameBillingAddress,
      };
    });
  };

  render = () => (
    <AntSwitchField
      checked={this.state.sameBillingAddress}
      label="Same As Address"
      formItemClassName="billing-switch-field"
      name="sameBillingAddress"
      onChange={this.handleChange}
      value={this.state.sameBillingAddress}
    />
  );
}

export default connect(
  null,
  { resetBillingFieldValues, setBillingFieldValues },
)(CustomerSwitchField);

CustomerSwitchField.propTypes = {
  resetBillingFieldValues: PropTypes.func.isRequired,
  setBillingFieldValues: PropTypes.func.isRequired,
};
