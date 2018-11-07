import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import {
  AntFormFieldsWithLabels,
  AntFormSubmit,
} from '../../app/formFields/antReduxFormFields';
import FIELDS from './accountDetailsFormFields';
import styles from '../../../styles';

class AccountForm extends Component {
  state = { confirmLoading: false };

  componentDidMount = () => this.initializeForm();

  componentDidUpdate = prevProps => {
    const { serverError, serverMessage } = this.props;
    if (serverError !== prevProps.serverError) this.resetLoading();
    if (serverMessage !== prevProps.serverMessage) this.initializeForm(true);
  };

  resetLoading = () => this.setState({ confirmLoading: false });

  initializeForm = resetConfirmLoading => {
    if (resetConfirmLoading) this.resetLoading();
    const {
      company,
      firstName,
      initialize,
      lastName,
      loggedinUser: email,
    } = this.props;
    initialize({
      company,
      email,
      firstName,
      lastName,
      currentPassword: '',
      updatedPassword: '',
    });
  };

  handleFormSubmit = formProps => {
    this.setState({ confirmLoading: true });
    this.props.updateUserAccount(formProps);
  };

  render = () => {
    const { handleSubmit, pristine, submitting } = this.props;
    const { confirmLoading } = this.state;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <div className={styles.accountDetailsContainer}>
          <AntFormFieldsWithLabels FIELDS={FIELDS} />
        </div>
        <div className={styles.accountButtonContainer}>
          <AntFormSubmit
            column={24}
            confirmLoading={confirmLoading}
            label="Update"
            disabled={submitting || pristine}
            style={{ height: 38, width: 84, marginTop: 5 }}
          />
        </div>
      </form>
    );
  };
}

export default reduxForm({
  form: 'AccountForm',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(AccountForm);

AccountForm.propTypes = {
  company: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  loggedinUser: PropTypes.string.isRequired,
  updateUserAccount: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  serverError: PropTypes.string,
  serverMessage: PropTypes.string,
  initialize: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};
