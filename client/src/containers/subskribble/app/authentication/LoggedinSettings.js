import React from 'react';
import { connect } from 'react-redux';
import SettingsButton from '../../../../components/subskribble/app/settings/SettingsButton';

export default connect(state => ({ ...state.auth }))( props => ( <SettingsButton {...props} />))
