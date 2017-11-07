import { map } from 'lodash';
import React from 'react';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';

import rocketLogo from '../../images/logos/rocketbiller_logo.png';

import { TextField } from 'redux-form-material-ui';
import RenderSubmitButton from '../forms/renderSubmitButton';

const AuthForm = ({ handleSubmit, FIELDS, formTitle, submitLabel, submitting }) => {
	return (
		<div>
			<img className="auth-logo" src={rocketLogo} alt="rocketLogo.png" />
			<div className="auth-box-container">
				<div className="auth-box">
					<h3 className="auth-title">{formTitle}</h3>
					<div className="auth-form">
						<form onSubmit={handleSubmit}>
							{map(FIELDS, ({ name, type, label, validateFields }, key) => {
								return (
									<span key={key}>
										<Field
											name={name}
											type={type}
											component={TextField}
											floatingLabelText={label}
											fullWidth={true}
											style={{ fontSize: 15 }}
											validate={validateFields}
										/>
										<br />
									</span>
								);
							})}
							{
								(formTitle === 'Sign In')
									? <div className="forgot-password">
											<Link to="/forgot-password"><i className="fa fa-lock m-r-5"/>Forgot password?</Link>
										</div>
									: null
							}
							<div className="auth-button">
								<RenderSubmitButton
									label={submitLabel}
									submitting={submitting}
								/>
							</div>
						</form>
					</div>
					<p className="auth-link">
					{
						(formTitle === 'Sign In')
							? <span>
									Don't have an account?
									<Link className="m-l-5" to="/signup">Sign Up</Link>
								</span>
							:	<span>
									Already have an account?
									<Link className="m-l-5" to="/login">Sign In</Link>
								</span>
					}
					</p>
				</div>
			</div>
		</div>
	);
}

export default reduxForm({ form: 'AuthForm' })(AuthForm);
