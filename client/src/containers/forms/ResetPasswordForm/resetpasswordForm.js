import React from 'react';
import { connect } from 'react-redux';

import AuthForm from '../AuthForm/authForm.js';
import FIELDS from './passwordResetFormFields.js';
import { resetUserToken } from '../../../actions/authActions.js';

const ResetPasswordForm = ({ resetUserToken, showLoadingButton, ...props }) => {
  const handleFormSubmit = ({ email }) => {
    showLoadingButton();
    resetUserToken(email);
  };

  return (
    <AuthForm
      {...props}
      form="ResetPasswordForm"
      iconType="retweet"
      onSubmit={handleFormSubmit}
      FIELDS={FIELDS}
      formTitle="Reset Password"
      submitLabel="Reset Password"
    />
  );
};

export default connect(
  null,
  { resetUserToken },
)(ResetPasswordForm);