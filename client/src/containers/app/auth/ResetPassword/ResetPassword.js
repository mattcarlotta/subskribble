import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Modal from 'containers/app/modals/asyncModal.js';
import NewPasswordForm from 'containers/forms/NewPasswordForm/newPasswordForm.js';

const resetSelectedForm = () => browserHistory.push('/');

export const ResetPassword = props => (
  <Modal
    {...props}
    closable={false}
    location={props.location}
    destroyOnClose={true} // eslint-disable-line react/jsx-boolean-value
    maskClosable={false}
    FORM={NewPasswordForm}
    resetSelectedForm={resetSelectedForm}
    title="Create New Password"
    visible={true} // eslint-disable-line react/jsx-boolean-value
  />
);

export default connect(state => ({ serverMessage: state.server.message }))(
  ResetPassword,
);
