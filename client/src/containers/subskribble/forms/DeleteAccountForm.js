import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { AntFormFieldsWithLabels, AntFormSubmit } from '../app/formFields/antReduxFormFields';
import FIELDS from '../app/formFields/deleteAccountFormFields';

class DeleteAccountForm extends Component {
	state = { confirmLoading: false };

	componentDidMount = () => this.props.initialize({ company: this.props.company })

	componentDidUpdate = (prevProps, prevState) => {
		const { serverError } = this.props;
		serverError !== prevProps.serverError && serverError !== undefined && this.setState({ confirmLoading: false })
	}

	handleFormSubmit = (formProps) => {
		this.setState({ confirmLoading: true })
		// this.props.updateUserAccount(formProps);
	}

	render = () => {
		const { handleSubmit, pristine, submitting } = this.props;
		const { confirmLoading } = this.state;

		return (
			<div className="new-form-container">
				<form onSubmit={handleSubmit(this.handleFormSubmit)}>
					<div className="delete-account-container">
						<AntFormFieldsWithLabels FIELDS={FIELDS} />
					</div>
					<div className="delete-button-container">
						<AntFormSubmit
							column={24}
							confirmLoading={confirmLoading}
							label="Delete My Account"
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
	form: 'DeleteAccountForm',
	enableReinitialize: true,
	keepDirtyOnReinitialize: true
})(DeleteAccountForm);
