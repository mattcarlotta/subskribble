import React, { Component } from 'react';
import { connect } from 'react-redux';
import { missingVerificationToken, verifyEmail } from '../../../../actions/authActions';
import EmailConfirmation from '../../../../components/subskribble/app/auth/emailConfirmation';
import Spinner from '../loading/Spinner';

class VerifyEmail extends Component {
  componentDidMount = () => {
    const { missingVerificationToken, verifyEmail, userVerified } = this.props;
    const { token } = this.props.location.query;

    !userVerified && !token ? missingVerificationToken() : verifyEmail(token)
  }

  render = () => (
    this.props.userVerified === undefined
      ? <Spinner />
      : <EmailConfirmation status={this.props.userVerified ? "verified" : "unverified" } userVerified={this.props.userVerified} />
  )
}

export default connect(state => ({ userVerified: state.auth.userVerified }), { missingVerificationToken, verifyEmail })(VerifyEmail);
