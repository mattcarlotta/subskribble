import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import styles from './emailConfirmation.scss';

const verificationFailure = () => (
  <Fragment>
    <h1>Email Verification Error!</h1>
    <p className={styles.message}>
      {`Oops! There was problem verifying your email. Please check your email and
      click the "Verify Email" button or the link below it again.`}
    </p>
    <p className={styles.message}>
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
    <p className={styles.message}>
      {`${userVerified} has been verified! Please log in to begin using your account.`}
    </p>
    <div className={styles.loginLinkContainer}>
      <Link className={styles.link} to="/subskribble">
        Login
      </Link>
    </div>
  </Fragment>
);

const EmailConfirmation = ({ status, userVerified }) => (
  <div className={styles.verificationContainer}>
    <div className={styles.statusContainer}>
      <div className={styles.subskribbleContainer}>
        <i className={styles.subskribbleLogo}>wifi_tethering</i>
        <span className={styles.textLogo}>subskribble</span>
      </div>
      <div className={styles.validContainer}>
        <div className={styles.messageContainer}>
          <div className={styles.validationResult}>
            <div className={styles.validationIcon}>
              <i className={`${styles.materialIcons} ${styles[status]}`}>
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
  userVerified: PropTypes.string.isRequired,
};
