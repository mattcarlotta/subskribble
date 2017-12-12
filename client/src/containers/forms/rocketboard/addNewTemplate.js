import map from 'lodash/map';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { TextField } from 'redux-form-material-ui';

import { addNewTemplate } from '../../../actions/formActionCreators';
import { isRequired, isValidEmail } from '../formfields/validateFormFields';
import FroalaEditor from '../formfields/FroalaEditorField';
import SubmitButton from '../formfields/renderSubmitButton';

const TEMPLATEFIELDS = [
  { name: 'templateName', label: 'Template Name', hintText: 'Enter a unique template name', validate: [isRequired] },
  { name: 'emailAddress', label: 'Addresser Email', hintText: 'Enter an email address you wish to address from', validate: [isRequired, isValidEmail] }
]

const AddNewTemplate = ({ addNewTemplate, handleSubmit, submitting }) => {
  const handleFormSubmit = (formProps) => {
    formProps.id = formProps.templateName.replace(/[^\w\s]/gi, '').replace(/ /g, '-').toLowerCase();
		console.log(formProps);
	}
  return (
    <div className="new-form-container">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {
          map(TEMPLATEFIELDS, ({ name, label, hintText, validate }, key) => {
            return (
              <div key={key} className="input-container">
                <Field
                  name={name}
                  type="text"
                  component={TextField}
                  floatingLabelText={label}
                  hintText={hintText}
                  style={{ fontSize: 15, width: '100%' }}
                  validate={validate}
                />
              </div>
            )
          })
        }
        <Field
          name="template"
          type="text"
          component={FroalaEditor}
          validate={[isRequired]}
        />
        <div className="button-container">
          <div className="button-center">
            <SubmitButton
              label="Save Template"
              submitting={submitting}
              backgroundColor={'#03a9f3'}
              buttonStyle={{ border: '2px solid transparent', borderRadius: 5 }}
              labelStyle={{ color: '#fff', fontSize: 15, fontFamily: "'Raleway Regular', Verdana, Helvetica, Arial, sans-serif", letterSpacing: 1 }}
              style={{ display: 'inline-block', height: 50, marginTop: 15, borderRadius: 6 }}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default reduxForm({ form: 'NewTemplate' })(connect(null, { addNewTemplate })(AddNewTemplate));
