import React from 'react';
import { connect } from 'react-redux';
import MyProfile from 'components/app/settings/MyProfile/MyProfile.js';
import * as actions from 'actions/avatarActions.js';
import { serverErrorMessage } from 'actions/appActions.js';
import { updateUserAccount } from 'actions/authActions.js';

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
