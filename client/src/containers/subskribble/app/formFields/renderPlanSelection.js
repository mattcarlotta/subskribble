import React from 'react';
import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { isSelected } from './validateFormFields';
import { AntRadioGroupField } from './antReduxFormFields';

const RenderPlanSelection = ({ PLANSELECTIONFIELDS, selectedPlan }) => (
  <AntRadioGroupField
    name="selectedPlan"
    FIELDS={PLANSELECTIONFIELDS}
    style={{ fontSize: 15, width: '100%' }}
    value={selectedPlan}
    validate={[isSelected]}
  />
)


export default connect(
  state => ({
    selectedPlan: formValueSelector('CustomerPlanSignup')(state, 'selectedPlan')
  })
)(RenderPlanSelection);
