import React from 'react';
import { connect } from 'react-redux';

import AuthForm from './AuthForm/authForm';
import FIELDS from '../app/formFields/passwordResetFormFields';
import { resetUserToken } from '../../actions/authActions';

const ResetPasswordForm = ({ resetUserToken, showLoadingButton, ...props }) => {
  const handleFormSubmit = ({ email }) => {
    showLoadingButton();
    resetUserToken(email);
  };

  return (
    <div className="auth-container">
      <AuthForm
        {...props}
        form="ResetPasswordForm"
        iconType="retweet"
        onSubmit={handleFormSubmit}
        FIELDS={FIELDS}
        formTitle="Reset Password"
        submitLabel="Reset Password"
      />
    </div>
  );
};

export default connect(
  null,
  { resetUserToken },
)(ResetPasswordForm);
