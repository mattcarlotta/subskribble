import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import AuthForm from './authForm';
import FIELDS from '../formfields/signinFormFields';
import { signinUser } from '../../../actions/authActionCreators';

const LoginForm = ({ signinUser }) => {
	const handleFormSubmit = (formProps) => {
		console.log(formProps);
	}
	return (
		<div className="auth-container">
			<AuthForm
				onSubmit={values => handleFormSubmit(values)}
				FIELDS={FIELDS}
				formTitle='Sign In'
				showForgotPassword={true}
				submitLabel='Login'
			/>
		</div>
	);
};

export default reduxForm({ form: 'LoginForm' })(connect(null, { signinUser })(LoginForm));
