import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import actions from '../../../../actions/authActions';
import SettingsButton from '../../../../components/subskribble/app/settings/SettingsButton';
import LoginButton from './LoginButton'

// class LoggedinSettings extends PureComponent {
//   // componentDidMount = () => this.props.signinUser();
//   render = () => (
//     <SettingsButton {...this.props} />
//   )
// }


class LoggedinSettings extends PureComponent {
  // componentDidMount = () => this.props.signinUser();
  render = () => (
    this.props.loggedinUser
      ? <SettingsButton {...this.props} />
      : <LoginButton />
  )
}

export default connect(state => ({ ...state.auth }), { ...actions })(LoggedinSettings)
