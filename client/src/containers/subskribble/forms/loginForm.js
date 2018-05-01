import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import AuthForm from './authForm';
import FIELDS from '../../formFields/signinFormFields';
import signinUser from '../../../actions/authActions';

const LoginForm = ({ confirmLoading, onFormSubmit, signinUser }) => {
	return (
		<div className="auth-container">
			<AuthForm
				confirmLoading={confirmLoading}
				onSubmit={values => onFormSubmit(values)}
				FIELDS={FIELDS}
				formTitle='Log In'
				showForgotPassword={true}
				submitLabel='Login'
			/>
		</div>
	);
};

export default reduxForm({ form: 'LoginForm' })(connect(null, { signinUser })(LoginForm));
