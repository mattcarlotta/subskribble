import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { AntFormSubmit, AntInput } from '../../formfields/antReduxFormFields';

import { registerToNewsletter } from '../../../actions/formActionCreators';
import { isValidEmail, isRequired } from '../formfields/validateFormFields';

const NewsletterForm = ({ handleSubmit, pristine, registerToNewsletter, submitting }) => {
	const handleFormSubmit = (formProps) => {
		console.log(formProps);
	}
	return (
		<div className="newsletter-container">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="newsletter-input">
          <Field
            name="email"
            type="email"
            component={AntInput}
            placeholder="Enter Email Address"
            style={{ fontSize: 15, width: '100%' }}
            validate={[isRequired, isValidEmail]}
          />
        </div>
        <div className="newsletter-button">
					<AntFormSubmit
						label="Join"
						pristine={pristine}
						submitting={submitting}
						style={{ fontSize: 16, height: 33, width: 100 }}
					/>
        </div>
      </form>
		</div>
	);
};

export default reduxForm({ form: 'NewsletterForm' })(connect(null, { registerToNewsletter })(NewsletterForm));
