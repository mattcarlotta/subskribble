import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { AntFormFieldsWithLabels } from 'containers/app/formFields/antReduxFormFields.js';
import FIELDS from './deleteAccountFormFields.js';
import styles from './deleteAccount.scss';

class DeleteAccountForm extends Component {
  componentDidMount = () =>
    this.props.initialize({
      company: this.props.company,
      user: this.props.loggedinUser,
    });

  handleFormSubmit = formProps => this.props.deleteUserAccount(formProps);

  render = () => (
    <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
      <div className={styles.accountDetailsContainer}>
        <AntFormFieldsWithLabels FIELDS={FIELDS} />
      </div>
      <div
        className={styles.accountButtonContainer}
        style={{ height: 90, padding: 20, marginBottom: 35 }}
      >
        <button
          type="submit"
          className={`ant-btn ${
            this.props.pristine ? styles.btnDisabled : styles.btnDanger
          }`}
          disabled={this.props.pristine || this.props.submitting}
          style={{ height: 38, marginTop: 5, float: 'left' }}
        >
          Delete My Account
        </button>
        <div className={styles.deleteAccountInformation}>
          <p className={styles.information}>
            <span className={styles.bold}>
              Last chance! Deleting your account is <u>irreversible</u>.
            </span>
            <br />
            If you are experiencing any issues with your account, please
            contact:{' '}
            <a href="mailto:helpdesk@subskribble.com">
              helpdesk@subskribble.com
            </a>
            .
          </p>
        </div>
      </div>
    </form>
  );
}

export default reduxForm({
  form: 'DeleteAccountForm',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(DeleteAccountForm);

DeleteAccountForm.propTypes = {
  company: PropTypes.string.isRequired,
  loggedinUser: PropTypes.string.isRequired,
  initialize: PropTypes.func.isRequired,
  deleteUserAccount: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};
