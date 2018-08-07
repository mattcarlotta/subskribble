import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { AntFormFieldsWithLabels, AntFormSubmit } from '../app/formFields/antReduxFormFields';
import FIELDS from '../app/formFields/accountDetailsFormFields';

class AccountForm extends Component {
	state = { confirmLoading: false };

	componentDidMount = () => {
		this.initializeForm();
	}

	componentDidUpdate = (prevProps, prevState) => {
		const { serverError } = this.props;
		serverError !== prevProps.serverError && serverError !== undefined && this.setState({ confirmLoading: false });
		// serverMessage !== prevProps.serverMessage && serverMessage !== undefined && hideAvatarForm();
	}

	initializeForm = () => {
		const { company, firstName, initialize, lastName, loggedinUser: email } = this.props;
		initialize({ company, email, firstName, lastName })
	}

	handleFormSubmit = (formProps) => {
		console.log(formProps);
		this.props.updateUserAccount(formProps);
	}

	render = () => {
		const { handleSubmit, pristine, submitting } = this.props;
		const { confirmLoading } = this.state;

		return (
			<div className="new-form-container">
				<form onSubmit={handleSubmit(this.handleFormSubmit)}>
					<div className="account-details-container">
						<AntFormFieldsWithLabels FIELDS={FIELDS} />
					</div>
					<div className="account-button-container">
						<AntFormSubmit
							column={24}
							confirmLoading={confirmLoading}
							label="Update"
							disabled={ submitting || pristine }
							style={{ height: 38, width: 84, marginTop: 5 }}
						/>
					</div>
				</form>
			</div>
		)
	}
};

export default reduxForm({
	form: 'AccountForm',
	enableReinitialize: true,
	keepDirtyOnReinitialize: true
})(AccountForm);
