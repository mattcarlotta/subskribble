import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { isSelected } from './validateFormFields';
import { AntRadioGroupField } from './antReduxFormFields';
import CustomScrollbars from '../../../components/app/scrollbars/CustomScrollbars';

class RenderPlanSelection extends PureComponent {
  render = () => (
    <div className="plans-container">
      <CustomScrollbars minHeight={400} top={0}>
        <AntRadioGroupField
          name="selectedPlan"
          FIELDS={this.props.PLANSELECTIONFIELDS}
          style={{ fontSize: 15, width: '100%' }}
          value={this.props.selectedPlan}
          validate={[isSelected]}
        />
        <div className="clear-fix" />
      </CustomScrollbars>
    </div>
  );
}

export default connect(state => ({
  selectedPlan: formValueSelector('CustomerPlanSignup')(state, 'selectedPlan'),
}))(RenderPlanSelection);

RenderPlanSelection.propTypes = {
  PLANSELECTIONFIELDS: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  selectedPlan: PropTypes.string,
};
