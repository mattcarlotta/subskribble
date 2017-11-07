import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import AuthForm from '../containers/auth/authForm';
import FIELDS from '../containers/auth/fields/signinFormFields';
import { signinUser } from '../actions/authActionCreators';

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
				submitLabel='Login'
			/>
		</div>
	);
};

export default reduxForm({ form: 'LoginForm' })(connect(null, { signinUser })(LoginForm));
