import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import AsyncModal from '../../modals/asyncModal';
import NewPasswordForm from '../../../forms/NewPasswordForm/newPasswordForm';

const resetSelectedForm = () => browserHistory.push('/');

const ResetPassword = props => (
  <AsyncModal
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
