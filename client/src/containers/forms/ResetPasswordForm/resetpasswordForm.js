import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Form from '../AuthForm/authForm.js';
import FIELDS from './passwordResetFormFields.js';
import { resetUserToken } from '../../../actions/authActions.js';

export class ResetPasswordForm extends PureComponent {
  handleFormSubmit = ({ email }) => {
    const { resetUserToken, showLoadingButton } = this.props;
    showLoadingButton();
    resetUserToken(email);
  };

  render = () => (
    <Form
      {...this.props}
      form="ResetPasswordForm"
      iconType="retweet"
      onSubmit={this.handleFormSubmit}
      FIELDS={FIELDS}
      formTitle="Reset Password"
      submitLabel="Reset Password"
    />
  );
}

export default connect(
  null,
  { resetUserToken },
)(ResetPasswordForm);
