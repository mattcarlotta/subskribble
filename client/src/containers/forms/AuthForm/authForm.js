import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import {
  AntFormFields,
  AntFormSubmit,
} from 'containers/app/formFields/antReduxFormFields.js';
import styles from 'styles/styles.scss';

export const AuthForm = ({
  confirmLoading,
  form,
  handleSubmit,
  iconType,
  FIELDS,
  pristine,
  submitLabel,
  showForgotPassword,
  submitting,
  switchAuthForm,
}) => (
  <div className={styles.authBoxContainer}>
    <div className={styles.authBox}>
      <div className={styles.authForm}>
        <form className={form} onSubmit={handleSubmit}>
          <AntFormFields FIELDS={FIELDS} />
          {showForgotPassword && (
            <div className={styles.forgotPassword}>
              <Link data-formid={1} onClick={switchAuthForm}>
                <i className={`${styles.materialIcons} ${styles.lockIcon}`}>
                  lock_open
                </i>
                {`Forgot your password?`}
              </Link>
            </div>
          )}
          <AntFormSubmit
            column={24}
            iconType={iconType}
            confirmLoading={confirmLoading}
            label={submitLabel}
            pristine={pristine}
            submitting={submitting}
            style={{ fontSize: 18, height: 45, marginTop: 5, width: '100%' }}
          />
        </form>
      </div>
      <p className={styles.authLink}>
        {showForgotPassword ? (
          <span className="no-account">
            {`Don't have an account?`}
            <Link
              style={{ marginLeft: 5 }}
              data-formid={2}
              onClick={switchAuthForm}
            >
              Sign Up
            </Link>
          </span>
        ) : (
          <span className="login">
            {`Already have an account?`}
            <Link
              style={{ marginLeft: 5 }}
              data-formid={0}
              onClick={switchAuthForm}
            >
              Log In
            </Link>
          </span>
        )}
      </p>
    </div>
  </div>
);

AuthForm.propTypes = {
  confirmLoading: PropTypes.bool.isRequired,
  form: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  iconType: PropTypes.string.isRequired,
  FIELDS: PropTypes.arrayOf(
    PropTypes.object, // eslint-disable-line react/forbid-prop-types
  ).isRequired,
  submitLabel: PropTypes.string.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  showForgotPassword: PropTypes.bool,
  switchAuthForm: PropTypes.func.isRequired,
};

export default reduxForm({ form: '' })(AuthForm);
