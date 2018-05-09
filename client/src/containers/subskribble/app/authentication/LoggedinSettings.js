import React from 'react';
import { connect } from 'react-redux';
import SettingsButton from '../../../../components/subskribble/app/settings/SettingsButton';

const LoggedinSettings = props => ( <SettingsButton {...props} />)

// export default connect(state => ({ ...state.auth }), { ...actions })(LoggedinSettings)
export default connect(state => ({ ...state.auth }))(LoggedinSettings)
