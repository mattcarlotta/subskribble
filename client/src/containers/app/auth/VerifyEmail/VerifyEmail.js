import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  missingVerificationToken,
  verifyEmail,
} from '../../../../actions/authActions';
import EmailConfirmation from '../../../../components/app/auth/Email/emailConfirmation';
import Spinner from '../../../../components/app/loading/Spinner/Spinner';

class VerifyEmail extends Component {
  componentDidMount = () => {
    const { missingVerificationToken, verifyEmail, userVerified } = this.props;
    const { token } = this.props.location.query;

    if (!userVerified && !token) {
      missingVerificationToken();
    } else {
      verifyEmail(token);
    }
  };

  render = () =>
    this.props.userVerified === undefined ? (
      <Spinner />
    ) : (
      <EmailConfirmation
        status={this.props.userVerified ? 'verified' : 'unverified'}
        userVerified={this.props.userVerified}
      />
    );
}

export default connect(
  state => ({ userVerified: state.auth.userVerified }),
  { missingVerificationToken, verifyEmail },
)(VerifyEmail);

VerifyEmail.propTypes = {
  location: PropTypes.shape({
    query: PropTypes.shape({
      token: PropTypes.string,
    }),
  }),
  missingVerificationToken: PropTypes.func.isRequired,
  verifyEmail: PropTypes.func.isRequired,
  userVerified: PropTypes.string,
};
