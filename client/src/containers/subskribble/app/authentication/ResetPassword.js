import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import AsyncModal from '../../../../components/subskribble/app/modals/asyncModal';
import NewPasswordForm from '../../forms/newPasswordForm';

class ResetPassword extends Component {
  state = { visible: true, confirmLoading: false }

  componentDidUpdate = (prevProps, prevState) => {
    const { serverError, serverMessage } = this.props;
    serverError !== prevProps.serverError && this.setState({ confirmLoading: false });
    serverMessage !== prevProps.serverMessage && browserHistory.push('/subskribble')
  }

  showLoadingButton = () => this.setState({ confirmLoading: true })

  handleClose = () => this.setState({ confirmLoading: false, visible: false });

	render = () => (
    <AsyncModal
      {...this.state}
      closable={false}
      location={this.props.location}
      destroyOnClose={true}
      maskClosable={false}
      FORM={NewPasswordForm}
      showLoadingButton={this.showLoadingButton}
      title="Create New Password"
    />
	);
}

export default connect(state => ({
  serverError: state.server.error,
  serverMessage: state.server.message
}))(ResetPassword);