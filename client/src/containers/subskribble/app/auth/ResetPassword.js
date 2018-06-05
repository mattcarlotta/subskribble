import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import AsyncModal from '../modals/asyncModal';
import NewPasswordForm from '../../forms/newPasswordForm';

const resetSelectedForm = () => browserHistory.push('/');

const ResetPassword = props => (
  <AsyncModal
    {...props}
    closable={false}
    location={props.location}
    destroyOnClose={true}
    maskClosable={false}
    FORM={NewPasswordForm}
    resetSelectedForm={resetSelectedForm}
    title="Create New Password"
    visible={true}
  />
)

export default connect(state => ({ serverMessage: state.server.message }))(ResetPassword);
