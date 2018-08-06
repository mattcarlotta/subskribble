import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { AntFormFields, AntFormSubmit } from '../app/formFields/antReduxFormFields';
import FIELDS from '../app/formFields/accountDetailsFormFields';

class AccountForm extends Component {
	state = { confirmLoading: false };

	componentDidMount = () => {
		this.initializeForm();
	}

	initializeForm = () => {
		const { company, firstName, initialize, lastName, loggedinUser: email } = this.props;
		initialize({ company, email, firstName, lastName })
	}

	handleFormSubmit = (formProps) => {
		console.log(formProps);
	}

	render = () => {
		const { handleSubmit, pristine, submitting } = this.props;
		const { confirmLoading } = this.state;

		return (
			<div className="new-form-container">
				<form onSubmit={handleSubmit(this.handleFormSubmit)}>
					<div className="account-details-container">
						<AntFormFields className="input-100" FIELDS={FIELDS} />
						<AntFormSubmit
							column={24}
							confirmLoading={confirmLoading}
							label="Update"
							pristine={pristine}
							submitting={submitting}
							style={{ fontSize: 18, height: 45, marginTop: 5 }}
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
