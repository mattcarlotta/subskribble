import React from 'react';
import { connect } from 'react-redux';
import MyProfile from '../../../../components/subskribble/app/settings/MyProfile';

const Settings = props => ( <MyProfile {...props} /> )

export default connect(state => ({ ...state.auth }))(Settings)
