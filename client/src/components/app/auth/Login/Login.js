import React, { Component } from 'react';
import AsyncModal from '../../../../containers/app/modals/asyncModal.js';
import LoginForm from '../../../../containers/forms/LoginForm/loginForm.js';
import ResetForm from '../../../../containers/forms/ResetPasswordForm/resetpasswordForm.js';
import SignupForm from '../../../../containers/forms/SignupForm/signupForm.js';
import { settingsTab } from '../../../../styles/styles.scss';

export const forms = [LoginForm, ResetForm, SignupForm];
export const titles = ['Log In', 'Reset Password', 'Sign Up'];

export default class Login extends Component {
  state = { visible: true, selectedForm: forms[0], title: titles[0] };

  resetSelectedForm = () =>
    this.setState({ selectedForm: forms[0], title: titles[0] });

  switchAuthForm = ({
    target: {
      dataset: { formid },
    },
  }) => this.setState({ selectedForm: forms[formid], title: titles[formid] });

  render = () => (
    <div className={settingsTab}>
      <AsyncModal
        {...this.state}
        {...this.props}
        closable={false}
        iconType="login"
        maskClosable={false}
        FORM={this.state.selectedForm}
        resetSelectedForm={this.resetSelectedForm}
        switchAuthForm={this.switchAuthForm}
        tooltipTitle="Log In"
      />
    </div>
  );
}
