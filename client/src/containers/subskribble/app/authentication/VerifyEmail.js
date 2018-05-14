import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';
import { missingToken, verifyEmail } from '../../../../actions/authActions';
import RenderMessages from '../messages/renderMessages';
import Spinner from '../loading/Spinner';

class VerifyEmail extends Component {
  componentDidMount = () => {
    const { missingToken, verifyEmail, userVerified } = this.props;
    const { token } = this.props.location.query;
    token && !userVerified && verifyEmail(token)
    !token && missingToken();
  }

  verificationFailure = () => (
    <div className="validation-result">
      <div className="validation-icon">
        <i className="material-icons unverified">highlight_off</i>
      </div>
      <h1>Email Verification Error!</h1>
      <p className="message">Oops! There was problem verifying your email. Please check your email and click the "Verify Email" button or the link below it again.</p>
      <p className="message">
        If you continue to receive this error, please contact us immediately at <a href="mailto:helpdesk@subskribble.com" rel="noopener noreferrer" target="_blank">helpdesk@subskribble.com</a>.
      </p>
    </div>
  )

  verficationSuccess = () => (
    <div className="validation-result">
      <div className="validation-icon">
        <i className="material-icons verified">check_circle</i>
      </div>
      <h1>Email Address Verified</h1>
      <p className="message">{this.props.userVerified} has been verified! Please log in to begin using your account.</p>
      <div className="login-link-container">
        <Link className="link" to="/subskribble">Login</Link>
      </div>
    </div>
  )

  render = () => {
    const { userVerified } = this.props;
    if (userVerified === undefined) return <Spinner />;
    return (
      <Fragment>
        <table className="verification-container">
          <tbody>
            <tr>
              <td className="status-container">
                <div className="subskribble-container">
                  <i className="material-icons subskribble-logo">wifi_tethering</i>
                  <span className="text-logo">subskribble</span>
                </div>
                <div className="valid-container">
                  <div className="message-container">
                    { userVerified
                      ? this.verficationSuccess()
                      : this.verificationFailure()
                    }
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <RenderMessages/>
      </Fragment>
    )
  }
}

export default connect(state => ({
  userVerified: state.auth.userVerified
}), { missingToken, verifyEmail })(withRouter(VerifyEmail));
