import React from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import { AntFormFields, AntFormSubmit } from '../../formFields/antReduxFormFields';

const AuthForm = ({ confirmLoading, handleSubmit, FIELDS, formTitle, pristine, submitLabel, showForgotPassword, submitting, switchAuthForm }) => (
	<div className="auth-box-container">
		<div className="auth-box">
			{/* <h3 className="auth-title">{formTitle}</h3> */}
			<div className="auth-form">
				<form onSubmit={handleSubmit}>
					<AntFormFields FIELDS={FIELDS} />
					{showForgotPassword &&
						<div className="forgot-password">
							<Link data-formid={1} onClick={switchAuthForm}><i className="fa fa-lock m-r-5"/>Forgot password?</Link>
						</div>
					}
					<AntFormSubmit
						confirmLoading={confirmLoading}
						label={submitLabel}
						pristine={pristine}
						submitting={submitting}
						style={{ fontSize: 18, height: 45, marginTop: 5, width: '100%' }}
					/>
				</form>
			</div>
			<p className="auth-link">
			{ showForgotPassword
				? <span>
						Don't have an account?
						<Link className="m-l-5" data-formid={2} onClick={switchAuthForm}>Sign Up</Link>
					</span>
				:	<span>
						Already have an account?
						<Link className="m-l-5" data-formid={0} onClick={switchAuthForm}>Log In</Link>
					</span>
			}
			</p>
		</div>
	</div>
);

export default reduxForm({ form: 'AuthForm' })(AuthForm);
