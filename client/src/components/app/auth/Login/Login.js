import React, { Component } from 'react';
import AsyncModal from '../../../../containers/app/modals/asyncModal';
import LoginForm from '../../../../containers/forms/LoginForm/loginForm';
import ResetForm from '../../../../containers/forms/resetpasswordForm';
import SignupForm from '../../../../containers/forms/signupForm';
import { settingsTab } from './Login.scss';

const forms = [LoginForm, ResetForm, SignupForm];
const titles = ['Log In', 'Reset Password', 'Sign Up'];

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
        maskClosable={false}
        FORM={this.state.selectedForm}
        resetSelectedForm={this.resetSelectedForm}
        switchAuthForm={this.switchAuthForm}
        tooltipTitle="Log In"
      />
    </div>
  );
}
