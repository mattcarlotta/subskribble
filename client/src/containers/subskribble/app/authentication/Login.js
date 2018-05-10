import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tooltip } from 'antd';
import AsyncModal from '../../../../components/subskribble/app/modals/asyncModal';
import LoginForm from '../../forms/loginForm';
import ResetForm from '../../forms/resetpasswordForm';
import SignupForm from '../../forms/signupForm';

const forms = [LoginForm, ResetForm, SignupForm];
const titles = ["Log In", "Reset Password", "Sign Up"];

class Login extends Component {
  state = {
    visible: true,
    confirmLoading: false,
    selectedForm: forms[0],
    title: titles[0]
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { serverError, serverMessage, loggedinUser } = this.props;
    serverError !== prevProps.serverError && this.setState({ confirmLoading: false });
    serverMessage !== prevProps.serverMessage && this.resetSelectedForm();
    loggedinUser !== prevProps.loggedinUser && this.handleClose();
  }

  resetSelectedForm = () => this.setState({ confirmLoading: false, selectedForm: forms[0], title: titles[0] })

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
  serverError: state.server.error,
  serverMessage: state.server.message
}))(Login);
