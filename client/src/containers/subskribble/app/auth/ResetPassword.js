import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import AsyncModal from '../modals/asyncModal';
import NewPasswordForm from '../../forms/newPasswordForm';

class ResetPassword extends Component {
  state = { visible: true }

  resetSelectedForm = () => browserHistory.push('/');

	render = () => (
    <AsyncModal
      {...this.props}
      {...this.state}
      closable={false}
      location={this.props.location}
      destroyOnClose={true}
      maskClosable={false}
      FORM={NewPasswordForm}
      resetSelectedForm={this.resetSelectedForm}
      title="Create New Password"
    />
	);
}

export default connect(state => ({ serverMessage: state.server.message }))(ResetPassword);
