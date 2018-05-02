import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import AuthForm from './authForm';
import FIELDS from '../../formFields/signupFormFields';
import { signupUser } from '../../../actions/authActions';

const SignupForm = ({ confirmLoading, showLoadingButton, signupUser, switchAuthForm }) => {
	const handleSubmit = values => {
		showLoadingButton();
		console.log('values', values);
		signupUser(values);
	}
	return (
		<div className="auth-container">
			<AuthForm
				confirmLoading={confirmLoading}
				onSubmit={values => handleSubmit(values)}
				FIELDS={FIELDS}
				formTitle='Sign Up'
				submitLabel='Signup'
				switchAuthForm={switchAuthForm}
			/>
		</div>
	)
}

export default reduxForm({ form: 'SignupForm' })(connect(null, { signupUser })(SignupForm));
