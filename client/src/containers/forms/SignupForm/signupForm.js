import React from 'react';
import { connect } from 'react-redux';

import AuthForm from '../AuthForm/authForm';
import FIELDS from './signupFormFields';
import { signupUser } from '../../../actions/authActions';

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
