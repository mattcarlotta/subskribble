import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import { signinUser } from '../../../../actions/authActions';
import SettingsButton from '../../../../components/subskribble/app/settings/SettingsButton';
import LoginButton from './LoginButton'

class LoggedinSettings extends PureComponent {
  render = () => (
    this.props.loggedinUser
      ? <SettingsButton {...this.props} />
      : <LoginButton />
  )
}

// export default connect(state => ({ ...state.auth }), { ...actions })(LoggedinSettings)
export default connect(state => ({ ...state.auth }))(LoggedinSettings)
