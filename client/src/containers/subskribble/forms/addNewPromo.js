import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { TextField, SelectField } from 'redux-form-material-ui';
import MenuItem from 'material-ui/MenuItem';

import { addNewPromoCode } from '../../../actions/formActionCreators';
import { isRequired } from '../../formfields/validateFormFields';
import Button from '../../formfields/renderFormButton';

class CreatePromoCode extends Component {
  state = { selectDiscountType: "$" };

  handleDiscountTypeChange = (event, index, value) => this.setState({ selectDiscountType: value });

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
              name="code"
              type="text"
              component={TextField}
              floatingLabelText="Promo Code Name"
              style={{ fontSize: 15, width: '100%' }}
              validate={[isRequired]}
            />
          </div>
          <div className="input-15 f-l">
            <Field
              name="discountType"
              type="text"
              component={SelectField}
              floatingLabelText="Discount Type"
              value={this.state.selectDiscountType}
              onChange={this.handleDiscountTypeChange}
              style={{ fontSize: 15, width: '100%' }}
              dropDownMenuProps={{anchorOrigin: {vertical:"center",horizontal:"left"}}}
              >
                <MenuItem value="$" primaryText="$" />
                <MenuItem value="%" primaryText="%" />
            </Field>
          </div>
          <div className="input-85 f-l">
            <Field
              name="discountAmount"
              type="text"
              component={TextField}
              floatingLabelText="Amount"
              style={{ fontSize: 15, width: '100%' }}
              validate={[isRequired]}
            />
          </div>
          <div className="clear-fix" />
          <div className="input-container">
            <Field
              name="maxUsage"
              type="text"
              component={TextField}
              floatingLabelText="Max Uses"
              hintText="Leave blank if unlimited"
              style={{ fontSize: 15, width: '100%' }}
              // validate={[isRequired]}
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

export default reduxForm({
  form: 'CreatePromoCode',
  initialValues: {
    discountType: "$"
  }
})(connect(null, { addNewPromoCode })(CreatePromoCode));
