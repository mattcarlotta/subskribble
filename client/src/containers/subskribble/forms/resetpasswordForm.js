import React from 'react';
import { connect } from 'react-redux';

import AuthForm from './authForm';
import FIELDS from '../../formFields/passwordResetFormFields';
import { resetUserPassword } from '../../../actions/authActions';

const ResetPasswordForm =	({ resetUserPassword, showLoadingButton, ...props }) => {
	const handleFormSubmit = values => {
		showLoadingButton();
		console.log('values', values);
		resetUserPassword(values);
	}

	return (
		<div className="auth-container">
			<AuthForm
				{...props}
				form="ResetPasswordForm"
				onSubmit={handleFormSubmit}
				FIELDS={FIELDS}
				formTitle='Reset Password'
				submitLabel='Confirm'
			/>
		</div>
	)
}


export default connect(null, { resetUserPassword })(ResetPasswordForm);
