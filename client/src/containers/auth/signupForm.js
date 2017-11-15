import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import AuthForm from './authForm';
import FIELDS from './fields/signupFormFields';
import { signupUser } from '../../actions/authActionCreators';

const SignupForm = ({ signupUser }) => {
	const handleFormSubmit = (formProps) => {
		console.log(formProps);
	}
	return (
		<div className="auth-container">
			<AuthForm
				onSubmit={values => handleFormSubmit(values)}
				FIELDS={FIELDS}
				formTitle='Sign Up'
				submitLabel='Register'
			/>
		</div>
	);
};

export default reduxForm({ form: 'SignupForm' })(connect(null, { signupUser })(SignupForm));
