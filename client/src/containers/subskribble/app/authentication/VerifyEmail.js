import React, { Component } from 'react';
import { connect } from 'react-redux';
import { missingToken, verifyEmail } from '../../../../actions/authActions';
import EmailConfirmation from '../../../../components/subskribble/app/auth/emailConfirmation';
import Spinner from '../loading/Spinner';

class VerifyEmail extends Component {
  componentDidMount = () => {
    const { missingToken, verifyEmail, userVerified } = this.props;
    const { token } = this.props.location.query;

    !userVerified && !token ? missingToken() : verifyEmail(token)
  }

  render = () => (
    this.props.userVerified === undefined
      ? <Spinner />
      : <EmailConfirmation status={this.props.userVerified ? "verified" : "unverified" } userVerified={this.props.userVerified} />
  )
}

export default connect(state => ({ userVerified: state.auth.userVerified }), { missingToken, verifyEmail })(VerifyEmail);
