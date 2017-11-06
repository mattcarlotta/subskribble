import { map } from 'lodash';
import React from 'react';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import rocketLogo from '../../images/logos/rocketbiller_logo.png';

import { TextField } from 'redux-form-material-ui';
import FIELDS from './data/signupFormData';
import RenderSubmitButton from '../forms/renderSubmitButton';

import { signupUser } from '../../actions/authActionCreators';

const validate = values => {
	const errors = {};

	if (!values.email) errors.email = 'Required';
	else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
		errors.email = 'Invalid email address';

	if (!values.username) errors.username = 'Required';
	else if (values.username.length < 3)
		errors.username = 'Username must be more than 3 characters!';

	if (!values.password) errors.password = 'Required';
	else if (values.password.length < 5)
		errors.password = 'Password must be more than 5 characters!';

	return errors;
};

const Signup = ({ handleSubmit, signupUser, submitting }) => {
	const handleFormSubmit = formProps => {
		console.log(formProps);
		// this.props.signupUser(formProps);
	};

	return (
		<div>
			<img className="auth-logo" src={rocketLogo} alt="rocketLogo.png" />
			<div className="auth-box-container">
				<div className="auth-box">
					<h3 className="auth-title">Register</h3>
					<div className="auth-form">
						<form onSubmit={handleSubmit(handleFormSubmit)}>
							{map(FIELDS, ({ name, type, label }, key) => {
								return (
									<span key={key}>
										<Field
											name={name}
											type={type}
											component={TextField}
											floatingLabelText={label}
											fullWidth={true}
											style={{ fontSize: 15 }}
										/>
										<br />
									</span>
								);
							})}
							<div className="auth-button">
								<RenderSubmitButton
									submitting={submitting}
									label='register'
								/>
							</div>
						</form>
					</div>
					<p className="auth-link">Already have an account? <Link to="/login">Sign In</Link></p>
				</div>
			</div>
		</div>
	);
}

export default reduxForm({ form: 'signup', validate })(connect(null, { signupUser })(Signup));
