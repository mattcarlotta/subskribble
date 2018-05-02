import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import AuthForm from './authForm';
import FIELDS from '../../formFields/signinFormFields';
import { signinUser } from '../../../actions/authActions';

const LoginForm = ({ confirmLoading, showLoadingButton, signinUser, switchAuthForm }) => {
	const handleSubmit = values => {
		showLoadingButton();
		console.log('values', values)
		signinUser(values);
	}
	return (
		<div className="auth-container">
			<AuthForm
				confirmLoading={confirmLoading}
				onSubmit={values => handleSubmit(values)}
				FIELDS={FIELDS}
				formTitle='Log In'
				showForgotPassword={true}
				submitLabel='Login'
				switchAuthForm={switchAuthForm}
			/>
		</div>
	);
}


export default reduxForm({ form: 'LoginForm' })(connect(null, { signinUser })(LoginForm));
