import React from 'react';
import { connect } from 'react-redux';

import AuthForm from '../AuthForm/authForm.js';
import FIELDS from './signupFormFields.js';
import { signupUser } from '../../../actions/authActions.js';

const SignupForm = ({ showLoadingButton, signupUser, ...props }) => {
  const handleFormSubmit = values => {
    showLoadingButton();
    signupUser(values);
  };
  return (
    <AuthForm
      {...props}
      form="SignupForm"
      iconType="team"
      onSubmit={handleFormSubmit}
      FIELDS={FIELDS}
      formTitle="Sign Up"
      submitLabel="Signup"
    />
  );
};

export default connect(
  null,
  { signupUser },
)(SignupForm);
