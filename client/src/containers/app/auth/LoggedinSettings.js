import React from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/authActions';
import SettingsButton from '../../../components/app/settings/SettingsButton/SettingsButton';

export default connect(
  state => ({ ...state.auth }),
  { logoutUser },
)(props => <SettingsButton {...props} />);
