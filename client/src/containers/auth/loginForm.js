import { map } from 'lodash';
import React from 'react';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import rocketLogo from '../../images/logos/rocketbiller_logo.png';

import { TextField } from 'redux-form-material-ui';
import FIELDS from '../auth/data/signinFormData';
import { isRequired } from '../forms/validateFormFields';
import RenderSubmitButton from '../forms/renderSubmitButton';

import { signinUser } from '../../actions/authActionCreators';

const LoginForm = ({ handleSubmit, signinUser, submitting }) => {
	const handleFormSubmit = (formProps) => {
		console.log(formProps);
		// signinUser(formProps);
	}

	return (
		<div>
			<img className="auth-logo" src={rocketLogo} alt="rocketLogo.png" />
			<div className="auth-box-container">
				<div className="auth-box">
					<h3 className="auth-title">Sign In</h3>
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
											validate={[isRequired]}
										/>
										<br />
									</span>
								);
							})}
							<div className="forgot-password">
								<Link to="/forgot-password"><i className="fa fa-lock m-r-5"/>Forgot password?</Link>
							</div>
							<div className="auth-button">
								<RenderSubmitButton
									label='Login'
									submitting={submitting}
								/>
							</div>
						</form>
					</div>
					<p className="auth-link">Don't have an account? <Link to="/signup">Sign Up</Link></p>
				</div>
			</div>
		</div>
	);
}

export default reduxForm({ form: 'loginForm' })(connect(null, { signinUser })(LoginForm));
