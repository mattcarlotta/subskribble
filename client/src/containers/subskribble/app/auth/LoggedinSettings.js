import React from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../../../actions/authActions';
import SettingsButton from '../../../../components/subskribble/app/settings/SettingsButton';

export default connect(state => ({ ...state.auth }), { logoutUser })( props => ( <SettingsButton {...props} />))
