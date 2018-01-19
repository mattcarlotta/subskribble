import map from 'lodash/map';
import React from 'react';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { AntFormSubmit, AntInput } from '../formfields/antReduxFormFields';
import rocketLogo from '../../../images/logos/rocketbiller_logo.png';

const AuthForm = ({ handleSubmit, FIELDS, formTitle, pristine, submitLabel, submitting }) => {
	return (
		<div>
			<img className="auth-logo" src={rocketLogo} alt="rocketLogo.png" />
			<div className="auth-box-container">
				<div className="auth-box">
					<h3 className="auth-title">{formTitle}</h3>
					<div className="auth-form">
						<form onSubmit={handleSubmit}>
							{map(FIELDS, ({ name, type, label, validateFields }, key) => (
								<Field
									key={key}
									name={name}
									type={type}
									component={AntInput}
									placeholder={label}
									style={{ fontSize: 15, width: '100%' }}
									validate={validateFields}
								/>
							))}
							{formTitle === 'Sign In' &&
								<div className="forgot-password">
									<Link to="/forgot-password"><i className="fa fa-lock m-r-5"/>Forgot password?</Link>
								</div>
							}
							<div className="auth-button">
								<AntFormSubmit
									label={submitLabel}
									pristine={pristine}
									submitting={submitting}
									style={{ fontSize: 18, height: 45, width: '100%' }}
								/>
							</div>
						</form>
					</div>
					<p className="auth-link">
					{formTitle === 'Sign In'
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
