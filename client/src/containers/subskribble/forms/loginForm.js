import React from 'react';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';

import AuthForm from './authForm';
import FIELDS from '../../formFields/signinFormFields';
import { signinUser } from '../../../actions/authActions';

const LoginForm = ({ cookies, showLoadingButton, signinUser, ...props }) => {
	const handleFormSubmit = values => {
		showLoadingButton();
		signinUser(values, cookies);
	}
	return (
		<div className="auth-container">
			<AuthForm
				{...props}
				form="LoginForm"
				onSubmit={handleFormSubmit}
				FIELDS={FIELDS}
				formTitle='Log In'
				showForgotPassword={true}
				submitLabel='Login'
			/>
		</div>
	);
}


export default connect(null, { signinUser })(withCookies(LoginForm));
