import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Avatar, Tooltip } from 'antd';
import AsyncModal from '../../../../components/subskribble/app/modals/asyncModal';
import LoginForm from '../../forms/loginForm';
import ResetForm from '../../forms/resetpasswordForm';
import SignupForm from '../../forms/signupForm';

const forms = [LoginForm, ResetForm, SignupForm];
const titles = ["Log In", "Reset Password", "Sign Up"];

class LoginButton extends Component {
  state = {
    visible: true,
    confirmLoading: false,
    selectedForm: forms[0],
    title: titles[0]
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { serverError, serverMessage, loggedinUser } = this.props;

    serverError !== prevProps.serverError && this.setState({ confirmLoading: false });

    if ((serverMessage !== prevProps.serverMessage) || (loggedinUser !== prevProps.loggedinUser)) {
      const { cookies, token } = this.props;
      if (token) cookies.set('Authorization', token)
      this.handleClose();
    }
  }

  switchAuthForm = ({target: {dataset: {formid}}}) => this.setState({
    selectedForm: forms[formid],
    title: titles[formid]
  })

  showModal = () => this.setState({ visible: true });

  showLoadingButton = () => this.setState({ confirmLoading: true })

  handleClose = () => this.setState({
    confirmLoading: false,
    visible: false,
    selectedForm: forms[0],
    title: titles[0]
  });

	render = () => (
    <div className="settings-tab">
			<Tooltip
				arrowPointAtCenter
				placement="bottom"
				title="Log In"
				overlayClassName="tooltip-placement"
        overlayStyle={{ display: this.state.visible ? 'none' : '' }}
      >
        <button className="settings-icon hide-button" onClick={this.showModal}>
          <Avatar className="signed-out" size="small" icon="user" />
        </button>
        <AsyncModal
          {...this.state}
          closable={false}
          maskClosable={false}
          FORM={this.state.selectedForm}
          onCancel={this.handleClose}
          showLoadingButton={this.showLoadingButton}
          switchAuthForm={this.switchAuthForm}
        />
			</Tooltip>
		</div>
	);
}

export default connect(state => ({
  loggedinUser: state.auth.loggedinUser,
  token: state.auth.token,
  serverError: state.server.error,
  serverMessage: state.server.message
}))(LoginButton);
