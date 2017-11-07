import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import AuthForm from '../containers/auth/authForm';
import FIELDS from '../containers/auth/fields/passwordResetFormFields';
import { resetUserPassword } from '../actions/authActionCreators';

const ResetPasswordForm = ({ resetUserPassword }) => {
	const handleFormSubmit = (formProps) => {
		console.log(formProps);
	}
	return (
		<div className="auth-container">
			<AuthForm
				onSubmit={values => handleFormSubmit(values)}
				FIELDS={FIELDS}
				formTitle='Reset Password'
				submitLabel='Submit'
			/>
		</div>
	);
};

export default reduxForm({ form: 'ResetPasswordForm' })(connect(null, { resetUserPassword })(ResetPasswordForm));
