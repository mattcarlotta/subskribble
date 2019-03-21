import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { isSelected } from 'containers/app/formFields/validateFormFields.js';
import { AntRadioGroupField } from 'containers/app/formFields/antReduxFormFields.js';
import CustomScrollbars from 'components/app/scrollbars/CustomScrollbars.js';
import { plansContainer } from './registerForm.scss';

class RenderPlanSelection extends PureComponent {
  render = () => (
    <div className={plansContainer}>
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

RenderPlanSelection.propTypes = {
  PLANSELECTIONFIELDS: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  selectedPlan: PropTypes.string,
};

export default connect(state => ({
  selectedPlan: formValueSelector('CustomerPlanSignup')(state, 'selectedPlan'),
}))(RenderPlanSelection);
