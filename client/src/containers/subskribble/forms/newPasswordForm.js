import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { AntFormFields, AntFormSubmit } from '../../formFields/antReduxFormFields';

import FIELDS from '../../formFields/newPasswordFormFields';
import { missingPasswordToken, resetUserPassword } from '../../../actions/authActions';

class NewPasswordForm extends Component {
	handleFormSubmit = ({ password }) => {
		const { missingPasswordToken, showLoadingButton, resetUserPassword } = this.props;
		const { token } = this.props.location.query;

		!token && missingPasswordToken();
		if (token) {
			showLoadingButton();
			resetUserPassword(password, token);
		}
	}

	render = () => (
		<div className="auth-container">
			<div className="auth-box-container">
				<div className="auth-box">
					<div className="auth-form">
						<form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
							<AntFormFields FIELDS={FIELDS} />
							<AntFormSubmit
								confirmLoading={this.props.confirmLoading}
								label="Update"
								pristine={this.props.pristine}
								submitting={this.props.submitting}
								style={{ fontSize: 18, height: 45, marginTop: 5, width: '100%' }}
							/>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default reduxForm({
	form: 'NewPasswordForm'
})(connect(null, { missingPasswordToken, resetUserPassword })(NewPasswordForm));
