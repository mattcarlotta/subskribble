import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { TextField } from 'redux-form-material-ui';

import RenderSubmitButton from '../formfields/renderSubmitButton';
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
            <RenderSubmitButton
              label="Join"
              submitting={submitting}
							backgroundColor={'#e04d2d'}
							buttonStyle={{ border: '2px solid transparent', borderRadius: 5 }}
							labelStyle={{ color: '#fbe2dd', fontSize: 18, fontFamily: "'Raleway Regular', Verdana, Helvetica, Arial, sans-serif", letterSpacing: 1 }}
							style={{ height: 45, width: 120, marginTop: 15, borderRadius: 6 }}
            />
          </div>
        </div>
      </form>
		</div>
	);
};

export default reduxForm({ form: 'NewsletterForm' })(connect(null, { registerToNewsletter })(NewsletterForm));
