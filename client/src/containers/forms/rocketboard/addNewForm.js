import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { TextField, SelectField } from 'redux-form-material-ui';
import MenuItem from 'material-ui/MenuItem';

import { addNewForm } from '../../../actions/formActionCreators';
import { isNotEmpty, isRequired } from '../formfields/validateFormFields';
import ClearButton from '../formfields/renderClearButton';
import SubmitButton from '../formfields/renderSubmitButton';
import ChipInput from '../formfields/renderChipField'

class AddNewForm extends Component {
  state = { selectGateway: 0, selectPlan: 0 };

  handleGatewayChange = (event, index, value) => this.setState({ selectGateway: value });
  handlePlanChange = (event, index, value) => this.setState({ selectPlan: value });

	handleFormSubmit = (formProps) => {
		console.log(formProps);
	}

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <div className="new-form-container">
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <div className="input-container">
            <Field
              name="id"
              type="text"
              component={TextField}
              floatingLabelText="Unique Id"
              style={{ fontSize: 15, width: '100%' }}
              validate={[isRequired]}
            />
          </div>
          <div className="input-container">
            <Field
              name="name"
              type="text"
              component={TextField}
              floatingLabelText="Name"
              style={{ fontSize: 15, width: '100%' }}
              validate={[isRequired]}
            />
          </div>
          <div className="input-container">
            <Field
              name="gateway"
              type="text"
              component={SelectField}
              value={this.state.selectGateway}
              onChange={this.handleGatewayChange}
              floatingLabelText="Gateway"
              style={{ fontSize: 15, width: '100%' }}
              dropDownMenuProps={{anchorOrigin: {vertical:"center",horizontal:"left"}}}
              validate={[isRequired]}
              >
                <MenuItem value="carlotta-gateway" primaryText="Carlotta Gateway" />
            </Field>
          </div>
          <div className="input-container">
            <Field
              name="plans"
              component={ChipInput}
              hintText="Add a plan then press enter"
              floatingLabelText="Plans"
              style={{ fontSize: 15, width: '100%' }}
              validate={[isRequired, isNotEmpty]}
            />
          </div>
          <div className="button-container">
              <div className="button">
                <SubmitButton
                  label="Save Form"
                  submitting={submitting}
                  backgroundColor={'#03a9f3'}
                  buttonStyle={{ border: '2px solid transparent', borderRadius: 5 }}
                  labelStyle={{ color: '#fff', fontSize: 15, fontFamily: "'Raleway Regular', Verdana, Helvetica, Arial, sans-serif", letterSpacing: 1 }}
                  style={{ display: 'inline block', height: 50, marginTop: 15, borderRadius: 6 }}
                />
              </div>
              <div className="button">
                <ClearButton
                  label="Clear Form"
                  submitting={submitting}
                  pristine={pristine}
                  reset={reset}
                  backgroundColor={'#ffaa00'}
                  buttonStyle={{ border: '2px solid transparent', borderRadius: 5 }}
                  labelStyle={{ color: '#fff', fontSize: 15, fontFamily: "'Raleway Regular', Verdana, Helvetica, Arial, sans-serif", letterSpacing: 1 }}
                  style={{ display: 'inline block', height: 50, marginTop: 15, borderRadius: 6 }}
                />
              </div>
            </div>
          </form>
        </div>
      );

  }
};

export default reduxForm({ form: 'NewForm' })(connect(null, { addNewForm })(AddNewForm));
