import React from 'react';
import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { isSelected } from '../formfields/validateFormFields';
import { AntRadioGroupField } from '../formfields/antReduxFormFields';

const RenderPlanSelection = ({ PLANSELECTIONFIELDS, selectedPlan }) => (
  <AntRadioGroupField
    FIELDS={PLANSELECTIONFIELDS}
    value={selectedPlan}
    validateFields={[isSelected]}
  />
)


export default connect(
  state => ({
    selectedPlan: formValueSelector('CustomerPlanSignup')(state, 'selectedPlan')
  })
)(RenderPlanSelection);
