import React from 'react';
import { Link } from 'react-router';
import {
  btnDanger,
  deleteAccountDetails,
  deleteButtonContainer,
  deleteAccountInformation,
  information,
  bold,
} from './deleteAccount.scss';

export default () => (
  <div className={deleteAccountDetails}>
    <div className={deleteButtonContainer}>
      <Link
        className={`ant-btn ${btnDanger}`}
        to="/subskribble/settings/delete-account"
        style={{ fontSize: 15, height: 38, width: 84, marginTop: 5 }}
      >
        <span style={{ position: 'relative', top: 3 }}>Delete</span>
      </Link>
    </div>
    <div className={deleteAccountInformation}>
      <p className={information}>
        <span className={bold}>
          Warning! Deleting your account is irreversible.
        </span>
        <br />
        {`If you are experiencing any issues with your account, please contact: `}
        <a href="mailto:helpdesk@subskribble.com">helpdesk@subskribble.com</a>.
      </p>
    </div>
  </div>
);
