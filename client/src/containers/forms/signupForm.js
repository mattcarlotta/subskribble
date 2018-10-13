import React from 'react';
import { connect } from 'react-redux';

import AuthForm from './authForm/authForm';
import FIELDS from '../app/formFields/signupFormFields';
import { signupUser } from '../../actions/authActions';

const SignupForm = ({ showLoadingButton, signupUser, ...props }) => {
  const handleFormSubmit = values => {
    showLoadingButton();
    signupUser(values);
  };
  return (
    <div className="auth-container">
      <AuthForm
        {...props}
        form="SignupForm"
        iconType="team"
        onSubmit={handleFormSubmit}
        FIELDS={FIELDS}
        formTitle="Sign Up"
        submitLabel="Signup"
      />
    </div>
  );
};

export default connect(
  null,
  { signupUser },
)(SignupForm);
