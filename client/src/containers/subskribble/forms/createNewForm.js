import filter from 'lodash/filter';
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { AntFormFields, AntSelectField, AntFormSubmit } from '../../formFields/antReduxFormFields';
import actions from '../../../actions/planActions';
import { allowedCharacters, isNotEmpty, isRequired } from '../../formFields/validateFormFields';
import Spinner from '../app/loading/Spinner';
const { addNewForm, fetchAllActivePlans } = actions;

const FIELDS = [{
  name: 'formName',
  type: 'text',
  placeholder: 'Form Name',
  validate: [isRequired, allowedCharacters]
}]

class CreateNewForm extends Component {
  state = { confirmLoading: false, isLoading: true, selectOptions: [], value: [] };

  componentDidMount = () => {
    this.props.fetchAllActivePlans()
    .then(({data: {activeplans}}) => this.setState({ isLoading: false, selectOptions: activeplans }))
    .catch(() => null)
  }

	handleFormSubmit = (formProps) => {
    this.setState({ confirmLoading: true });
    // addNewForm
		console.log(formProps);
	}

  handleDeselect = remVal => this.setState({ value: filter(this.state.value, val => val !== remVal) })

  handleChange = value => this.setState({ value: !value ? value : {...this.state.value, value} })

  render = () => {
    const { handleSubmit, pristine, submitting } = this.props;
    const { confirmLoading, selectOptions, isLoading, value } = this.state;

    return (
      isLoading
        ? <Spinner />
        : <div className="new-form-container">
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
              <AntFormFields FIELDS={FIELDS} />
              <AntSelectField
                currentValue={value}
                name="plans"
                mode="tags"
                placeholder="Click inside this box and select plans from the list below."
                style={{ width: '100%' }}
                onChange={this.handleChange}
                onDeselect={this.handleDeselect}
                selectOptions={selectOptions}
                tokenSeparators={[',']}
                validate={[isNotEmpty]}
              />
              <AntFormSubmit
    						confirmLoading={confirmLoading}
                label="Submit"
    						pristine={pristine}
    						submitting={submitting}
    						style={{ fontSize: 18, height: 45, marginTop: 5, width: '100%' }}
    					/>
            </form>
          </div>
    )
  }
};

export default reduxForm({ form: 'NewForm' })(connect(null, { addNewForm, fetchAllActivePlans })(CreateNewForm));
