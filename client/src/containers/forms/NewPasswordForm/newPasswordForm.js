import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import {
  AntFormFields,
  AntFormSubmit,
} from 'containers/app/formFields/antReduxFormFields.js';

import {
  missingPasswordToken,
  resetUserPassword,
} from 'actions/authActions.js';
import styles from 'styles/styles.scss';
import FIELDS from './newPasswordFormFields.js';

class NewPasswordForm extends Component {
  handleFormSubmit = ({ password }) => {
    const {
      missingPasswordToken,
      showLoadingButton,
      resetUserPassword,
    } = this.props;
    const { token } = this.props.location.query;

    if (!token) {
      missingPasswordToken();
    } else {
      showLoadingButton();
      resetUserPassword(password, token);
    }
  };

  render = () => (
    <div className={styles.authBoxContainer}>
      <div className={styles.authBox}>
        <div className={styles.authForm}>
          <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
            <AntFormFields FIELDS={FIELDS} />
            <AntFormSubmit
              confirmLoading={this.props.confirmLoading}
              label="Update"
              pristine={this.props.pristine}
              submitting={this.props.submitting}
              style={{
                fontSize: 18,
                height: 45,
                marginTop: 5,
                width: '100%',
              }}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default reduxForm({
  form: 'NewPasswordForm',
})(
  connect(
    null,
    { missingPasswordToken, resetUserPassword },
  )(NewPasswordForm),
);

NewPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  missingPasswordToken: PropTypes.func,
  resetUserPassword: PropTypes.func.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  showLoadingButton: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    query: PropTypes.shape({
      token: PropTypes.string,
    }),
  }).isRequired,
};
