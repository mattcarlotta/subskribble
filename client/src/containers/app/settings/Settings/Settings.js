import React from 'react';
import { connect } from 'react-redux';
import MyProfile from '../../../../components/app/settings/MyProfile/MyProfile';
import * as actions from '../../../../actions/avatarActions';
import { serverErrorMessage } from '../../../../actions/appActions';
import { updateUserAccount } from '../../../../actions/authActions';

const Settings = props => <MyProfile {...props} />;

export default connect(
  state => ({
    ...state.auth,
    unreadNotifications: state.notes.unreadNotifications,
    serverError: state.server.error,
    serverMessage: state.server.message,
  }),
  {
    ...actions,
    updateUserAccount,
    serverErrorMessage,
  },
)(Settings);
