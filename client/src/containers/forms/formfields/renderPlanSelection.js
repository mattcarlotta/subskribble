import map from 'lodash/map';
import React, { Component } from 'react';
import { Field } from 'redux-form';
import { RadioButton } from 'material-ui/RadioButton';
import { RadioButtonGroup } from 'redux-form-material-ui';

import { isSelected } from '../formfields/validateFormFields';

class RenderPlanSelection extends Component {
  state={ selectedPlan: null };

  handleChange = (value) => this.setState({ selectedPlan: value });

  planSelectionField = (field) => {
    return map(this.props.PLANSELECTIONFIELDS, ({ description, plan, price }) => {
      return (
        <div key={plan} className={ (plan === this.state.selectedPlan) ? "plan-container selected" : "plan-container"}>
          <div className="header">
            <h3 className="plan-title">{plan}</h3>
            <h2 className="price"><span className="price-sign">$</span>{price}</h2>
            <p>per month</p>
          </div>
          <div className="body">
            <div className="description">{description}</div>
          </div>
          <div className="selection">
            <RadioButtonGroup
              name="planSelection"
              onChange={(event, value) => {
                field.input.onChange(value)
                this.handleChange(value);
              }}
              valueSelected={this.state.selectedPlan}
              >
                <RadioButton
                  value={plan}
                  name={plan} />
            </RadioButtonGroup>
          </div>
          {field.meta.touched &&
            field.meta.error &&
            <div className="error-handlers">
              {field.meta.error}
            </div>
          }
        </div>

      )
    })
  }

  render() {
    return (
      <Field
        name="planSelection"
        component={this.planSelectionField}
        validate={[isSelected]}
      />
    )
  }
}

export default RenderPlanSelection;
