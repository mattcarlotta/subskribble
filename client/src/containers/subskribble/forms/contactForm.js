import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { AntFormFields, AntFormSubmit } from '../../formfields/antReduxFormFields';
import { sendSupportEmail } from '../../../actions/formActionCreators';
import FIELDS from '../formfields/contactFormFields';

const ContactForm = ({ handleSubmit, pristine, sendSupportEmail, submitting }) => {
	const handleFormSubmit = (formProps) => {
		console.log(formProps);
	}
	return (
		<div className="contact-form">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <AntFormFields FIELDS={FIELDS} />
				<AntFormSubmit
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
