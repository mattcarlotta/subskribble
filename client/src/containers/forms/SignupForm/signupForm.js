import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Form from 'containers/forms/AuthForm/authForm.js';
import { signupUser } from 'actions/authActions.js';
import FIELDS from './signupFormFields.js';

export class SignupForm extends PureComponent {
  handleFormSubmit = values => {
    const { showLoadingButton, signupUser } = this.props;
    showLoadingButton();
    signupUser(values);
  };

  render = () => (
    <Form
      {...this.props}
      form="SignupForm"
      iconType="team"
      onSubmit={this.handleFormSubmit}
      FIELDS={FIELDS}
      formTitle="Sign Up"
      submitLabel="Signup"
    />
  );
}

export default connect(
  null,
  { signupUser },
)(SignupForm);
