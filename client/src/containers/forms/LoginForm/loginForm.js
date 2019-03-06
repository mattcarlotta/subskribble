import React from 'react';
import { connect } from 'react-redux';

import AuthForm from '../AuthForm/authForm.js';
import FIELDS from './loginFormFields.js';
import { signinUser } from '../../../actions/authActions.js';

const LoginForm = ({ showLoadingButton, signinUser, ...props }) => {
  const handleFormSubmit = values => {
    showLoadingButton();
    signinUser(values);
  };
  return (
    <AuthForm
      {...props}
      form="LoginForm"
      onSubmit={handleFormSubmit}
      FIELDS={FIELDS}
      formTitle="Log In"
      showForgotPassword
      submitLabel="Login"
    />
  );
};

export default connect(
  null,
  { signinUser },
)(LoginForm);