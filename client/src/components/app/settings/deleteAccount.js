import React from 'react';
import { Link } from 'react-router';

export default () => (
  <div className="delete-account-details">
    <div className="delete-button-container">
      <Link
        className="ant-btn btn-danger"
        to="/subskribble/settings/delete-account"
        style={{ fontSize: 15, height: 38, width: 84, marginTop: 5 }}
      >
        <span style={{ position: 'relative', top: 3 }}>Delete</span>
      </Link>
    </div>
    <div className="delete-account-information">
      <p className="information">
        <span className="bold">
          Warning! Deleting your account is irreversible.
        </span>
        <br />
        {`If you are experiencing any issues with your account, please contact: `}
        <a href="mailto:helpdesk@subskribble.com">helpdesk@subskribble.com</a>.
      </p>
    </div>
  </div>
);
