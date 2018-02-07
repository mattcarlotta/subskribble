import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { TextField, SelectField } from 'redux-form-material-ui';
import MenuItem from 'material-ui/MenuItem';

import { addNewForm } from '../../../actions/formActionCreators';
import { isNotEmpty, isRequired } from '../../formfields/validateFormFields';
import Button from '../../formfields/renderFormButton';
import ChipInput from '../../formfields/renderChipField'

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
                <Button
                  backgroundColor="#03a9f3"
                  fullWidth={true}
                  height={50}
                  label="Save Form"
                  submitting={submitting}
                  type="submit"
                />
              </div>
              <div className="button">
                <Button
                  backgroundColor="#ffaa00"
                  fontSize={15}
                  fullWidth={true}
    							height={50}
                  label="Clear Form"
                  pristine={pristine}
                  onClick={reset}
                  submitting={submitting}
                  type="clear"
                />
              </div>
            </div>
          </form>
        </div>
      );

  }
};

export default reduxForm({ form: 'NewForm' })(connect(null, { addNewForm })(AddNewForm));
