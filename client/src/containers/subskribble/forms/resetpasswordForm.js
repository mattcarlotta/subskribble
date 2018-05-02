import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import AuthForm from './authForm';
import FIELDS from '../../formFields/passwordResetFormFields';
import { resetUserPassword } from '../../../actions/authActions';

const ResetPasswordForm =	({ confirmLoading, resetUserPassword, showLoadingButton, switchAuthForm }) => {
	const handleSubmit = values => {
		showLoadingButton();
		console.log('values', values);
		resetUserPassword(values);
	}

	return (
		<div className="auth-container">
			<AuthForm
				confirmLoading={confirmLoading}
				onSubmit={values => handleSubmit(values)}
				FIELDS={FIELDS}
				formTitle='Reset Password'
				submitLabel='Confirm'
				switchAuthForm={switchAuthForm}
			/>
		</div>
	)
}


export default reduxForm({ form: 'ResetPasswordForm' })(connect(null, { resetUserPassword })(ResetPasswordForm));
