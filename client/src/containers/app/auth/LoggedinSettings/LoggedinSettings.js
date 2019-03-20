import React from 'react';
import { connect } from 'react-redux';
import { logoutUser } from 'actions/authActions.js';
import SettingsButton from 'components/app/settings/SettingsButton/SettingsButton.js';

export default connect(
  state => ({ ...state.auth }),
  { logoutUser },
)(props => <SettingsButton {...props} />);
