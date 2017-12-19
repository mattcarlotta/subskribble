import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { TextField } from 'redux-form-material-ui';

import Button from '../formfields/renderFormButton';
import { registerToNewsletter } from '../../../actions/formActionCreators';
import { isValidEmail, isRequired } from '../formfields/validateFormFields';

const NewsletterForm = ({ handleSubmit, registerToNewsletter, submitting }) => {
	const handleFormSubmit = (formProps) => {
		console.log(formProps);
	}
	return (
		<div className="newsletter-container">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="newsletter-width-50">
          <Field
            name="email"
            type="text"
            component={TextField}
            floatingLabelText="Enter Email Address"
            style={{ fontSize: 15, width: '100%' }}
            validate={[isRequired, isValidEmail]}
          />
        </div>
        <div className="newsletter-width-35">
          <div className="m-t-5">
            <Button
							backgroundColor="#e04d2d"
							fontSize={16}
							height={45}
              label="Join"
              submitting={submitting}
							width={120}
            />
          </div>
        </div>
      </form>
		</div>
	);
};

export default reduxForm({ form: 'NewsletterForm' })(connect(null, { registerToNewsletter })(NewsletterForm));
