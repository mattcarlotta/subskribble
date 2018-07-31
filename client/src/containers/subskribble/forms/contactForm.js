import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { AntFormFields, AntFormSubmit } from '../app/formfields/antReduxFormFields';
import { sendSupportEmail } from '../../app/actions/formActionCreators';
import FIELDS from '../app/formfields/contactFormFields';

const ContactForm = ({ handleSubmit, pristine, sendSupportEmail, submitting }) => {
	const handleFormSubmit = (formProps) => {
		console.log(formProps);
	}
	return (
		<div className="contact-form">
			<form onSubmit={handleSubmit(handleFormSubmit)}>
				<AntFormFields FIELDS={FIELDS} />
				<AntFormSubmit
					column={24}
					label="Send Message"
					pristine={pristine}
					submitting={submitting}
					style={{ fontSize: 18, height: 45, marginTop: 165, width: '100%' }}
				/>
			</form>
		</div>
	);
};

export default reduxForm({ form: 'ContactForm' })(connect(null, { sendSupportEmail })(ContactForm));
