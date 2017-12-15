import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { TextField } from 'redux-form-material-ui';

import Button from '../formfields/renderFormButton';
import { sendSupportEmail } from '../../../actions/formActionCreators';
import { isValidEmail, isRequired, maxLength2000 } from '../formfields/validateFormFields';

const ContactForm = ({ handleSubmit, sendSupportEmail, submitting }) => {
	const handleFormSubmit = (formProps) => {
		console.log(formProps);
	}
	return (
		<div className="contact-form">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Field
          name="name"
          type="text"
          component={TextField}
          floatingLabelText="Full Name"
          style={{ fontSize: 15, width: '100%' }}
          validate={[isRequired]}
        />
        <Field
          name="email"
          type="text"
          component={TextField}
          floatingLabelText="Email Address"
          style={{ fontSize: 15, width: '100%' }}
          validate={[isRequired, isValidEmail]}
        />
        <Field
          name="message"
          type="text"
          component={TextField}
          floatingLabelText="Message"
          style={{ fontSize: 15, width: '100%' }}
          multiLine={true}
          rows={4}
          rowsMax={4}
          validate={[isRequired, maxLength2000]}
        />
        <Button
					backgroundColor="#e04d2d"
          label="Send Message"
					fontSize={15}
					height={50}
					fullWidth={true}
					submitting={submitting}
					type="submit"
        />
      </form>
		</div>
	);
};

export default reduxForm({ form: 'ContactForm' })(connect(null, { sendSupportEmail })(ContactForm));
