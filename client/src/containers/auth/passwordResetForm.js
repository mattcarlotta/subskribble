import React from 'react';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import rocketLogo from '../../images/logos/rocketbiller_logo.png';

import { TextField } from 'redux-form-material-ui';
import RenderSubmitButton from '../forms/renderSubmitButton';
import { validEmail } from '../forms/validateFormFields';

import { resetUserPassword } from '../../actions/authActionCreators';


const PasswordReset = ({ handleSubmit, submitting }) => {
	const handleFormSubmit = formProps => {
		console.log(formProps);
		// this.props.signupUser(formProps);
	};

	return (
		<div>
			<img className="auth-logo" src={rocketLogo} alt="rocketLogo.png" />
			<div className="auth-box-container">
				<div className="auth-box">
					<h3 className="auth-title">Forgot Password</h3>
					<div className="auth-form">
						<form onSubmit={handleSubmit(handleFormSubmit)}>
							<Field
							  name='email'
								type='text'
								component={TextField}
								floatingLabelText='Enter Email Account'
								fullWidth={true}
								style={{ fontSize: 15 }}
                validate={[validEmail]}
							/>
							<br />
							<div className="auth-button">
								<RenderSubmitButton
									submitting={submitting}
									label='submit'
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

export default reduxForm({ form: 'PasswordReset' })(connect(null, { resetUserPassword })(PasswordReset));
