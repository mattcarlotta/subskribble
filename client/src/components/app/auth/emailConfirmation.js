import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const verificationFailure = () => (
  <Fragment>
    <h1>Email Verification Error!</h1>
    <p className="message">
      {`Oops! There was problem verifying your email. Please check your email and
      click the "Verify Email" button or the link below it again.`}
    </p>
    <p className="message">
      {`If you continue to receive this error, please contact us immediately at`}
      <a
        href="mailto:helpdesk@subskribble.com"
        rel="noopener noreferrer"
        target="_blank"
      >
        helpdesk@subskribble.com
      </a>
      {`.`}
    </p>
  </Fragment>
);

const verificationSuccess = userVerified => (
  <Fragment>
    <h1>Email Address Verified</h1>
    <p className="message">
      {`${userVerified} has been verified! Please log in to begin using your account.`}
    </p>
    <div className="login-link-container">
      <Link className="link" to="/subskribble">
        Login
      </Link>
    </div>
  </Fragment>
);

const EmailConfirmation = ({ status, userVerified }) => (
  <div className="verification-container">
    <div className="status-container">
      <div className="subskribble-container">
        <i className="material-icons subskribble-logo">wifi_tethering</i>
        <span className="text-logo">subskribble</span>
      </div>
      <div className="valid-container">
        <div className="message-container">
          <div className="validation-result">
            <div className="validation-icon">
              <i className={`material-icons ${status}`}>
                {userVerified ? 'check_circle' : 'highlight_off'}
              </i>
            </div>
            {userVerified
              ? verificationSuccess(userVerified)
              : verificationFailure()}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default EmailConfirmation;

EmailConfirmation.propTypes = {
  status: PropTypes.string,
  userVerified: PropTypes.bool.isRequired,
};
