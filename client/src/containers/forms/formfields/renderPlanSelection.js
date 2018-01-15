import map from 'lodash/map';
import React from 'react';
import { Field } from 'redux-form';
import { RadioButton } from 'material-ui/RadioButton';
import { RadioButtonGroup } from 'redux-form-material-ui';
import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { isSelected } from '../formfields/validateFormFields';

const RenderPlanSelection = ({ PLANSELECTIONFIELDS, selectedPlan }) => {
  const planSelectionField = ({ input, label, type, meta: { touched, error } }) => {
    return (
      <div className="plan-selection-container">
        {map(PLANSELECTIONFIELDS, ({ description, plan, price }) => {
          return (
            <div key={plan} className={ (plan === selectedPlan) ? "selection-container selected" : "selection-container"}>
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
                  name="selectedPlan"
                  onChange={(event, value) => input.onChange(value)}
                  valueSelected={selectedPlan}
                  >
                    <RadioButton
                      value={plan}
                      name={plan} />
                </RadioButtonGroup>
              </div>
              {touched &&
                error &&
                <div className="error-handlers">
                  {error}
                </div>
              }
            </div>
          )}
        )}
      </div>
    )
  }

  return (
    <Field
      name="selectedPlan"
      component={planSelectionField}
      validate={[isSelected]}
    />
  )
}

export default connect(
  state => ({
    selectedPlan: formValueSelector('CustomerPlanSignup')(state, 'selectedPlan')
  })
)(RenderPlanSelection);
