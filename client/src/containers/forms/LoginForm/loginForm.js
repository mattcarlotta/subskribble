import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Form from '../AuthForm/authForm.js';
import FIELDS from './loginFormFields.js';
import { signinUser } from '../../../actions/authActions.js';

export class LoginForm extends PureComponent {
  handleFormSubmit = values => {
    const { showLoadingButton, signinUser } = this.props;
    showLoadingButton();
    signinUser(values);
  };

  render = () => (
    <Form
      {...this.props}
      form="LoginForm"
      onSubmit={this.handleFormSubmit}
      FIELDS={FIELDS}
      formTitle="Log In"
      showForgotPassword
      submitLabel="Login"
    />
  );
}

export default connect(
  null,
  { signinUser },
)(LoginForm);
