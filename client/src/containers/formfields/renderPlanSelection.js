import React from 'react';
import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { isSelected } from '../formfields/validateFormFields';
import { AntRadioGroupField } from '../formfields/antReduxFormFields';

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
