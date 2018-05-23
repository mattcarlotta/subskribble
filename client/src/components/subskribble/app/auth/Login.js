import React, { Component } from 'react';
import AsyncModal from '../../../../containers/subskribble/app/modals/asyncModal';
import LoginForm from '../../../../containers/subskribble/forms/loginForm';
import ResetForm from '../../../../containers/subskribble/forms/resetpasswordForm';
import SignupForm from '../../../../containers/subskribble/forms/signupForm';

const forms = [LoginForm, ResetForm, SignupForm];
const titles = ["Log In", "Reset Password", "Sign Up"];

export default class Login extends Component {
  state = { visible: true, selectedForm: forms[0], title: titles[0] };

  resetSelectedForm = () => this.setState({ visible: false, selectedForm: forms[0], title: titles[0] })

  switchAuthForm = ({target: {dataset: {formid}}}) => this.setState({ selectedForm: forms[formid], title: titles[formid] })

	render = () => (
    <div className="settings-tab">
      <AsyncModal
        {...this.state}
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
