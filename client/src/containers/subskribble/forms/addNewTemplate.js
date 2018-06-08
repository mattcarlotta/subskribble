import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { AntFormFields, AntSelectField, AntStepFormButtons } from '../app/formFields/antReduxFormFields';
import actions from '../../../actions/planActions';
import { allowedCharacters, isNotEmpty, isRequired } from '../app/formFields/validateFormFields';
import Spinner from '../loading/Spinner';
const { addNewForm, fetchAllActivePlans } = actions;

const FIELDS = [{
  name: 'formName',
  type: 'text',
  placeholder: 'Unique form name',
  validate: [isRequired, allowedCharacters]
}]

class CreateNewTemplate extends Component {
  state = { confirmLoading: false, isLoading: true, selectOptions: [] };

  componentDidMount = () => {
    this.props.fetchAllActivePlans()
    .then(({data: {activeplans}}) => this.setState({ isLoading: false, selectOptions: activeplans }))
    .catch(() => null)
  }

	handleFormSubmit = (formProps) => {
    this.setState({ confirmLoading: true });
		console.log(formProps);
    // addNewForm(formProps);
	}

  goBackPage = () => browserHistory.goBack();

  render = () => {
    const { handleSubmit, pristine, submitting } = this.props;
    const { confirmLoading, selectOptions, isLoading } = this.state;

    return (
      isLoading
        ? <Spinner />
        : <div className="new-form-container">
            <div className="form-box-container">
              <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                <h1 style={{ textAlign: 'center', marginBottom: 30 }}>Create Form</h1>
                <AntFormFields FIELDS={FIELDS} />
                <AntSelectField
                  className="tag-container"
                  name="plans"
                  mode="tags"
                  placeholder="Click inside this box and select plans from the list below."
                  style={{ width: '100%' }}
                  selectOptions={selectOptions}
                  tokenSeparators={[',']}
                  validate={[isNotEmpty]}
                />
                <hr />
                <AntStepFormButtons
                  backLabel="Back"
                  backStyle={{ height: 50, float: 'left' }}
                  confirmLoading={confirmLoading}
                  onClickBack={this.goBackPage}
                  pristine={pristine}
                  submitLabel="Submit"
                  submitStyle= {{ height: 50, float: 'right' }}
                  submitting={submitting}
                />
              </form>
            </div>
          </div>
    )
  }
};

export default reduxForm({ form: 'NewTemplate' })(connect(null, { addNewForm, fetchAllActivePlans })(CreateNewTemplate));
