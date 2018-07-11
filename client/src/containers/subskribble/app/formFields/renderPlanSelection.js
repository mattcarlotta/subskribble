import React, { PureComponent } from 'react';
import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { isSelected } from './validateFormFields';
import { AntRadioGroupField } from './antReduxFormFields';

class RenderPlanSelection extends PureComponent {
  render = () => (
    <div style={{ minHeight: 500, marginBottom: 20 }}>
      <Scrollbars
        ref="scrollbars"
        style={{ width: '100%', top: 0 }}
        autoHeight
        autoHeightMin={500}
        autoHide
        autoHideTimeout={500}
        autoHideDuration={200}
        renderThumbVertical={props => <div {...props} className="scrollbar"/>}
        >
          <AntRadioGroupField
            name="selectedPlan"
            FIELDS={this.props.PLANSELECTIONFIELDS}
            style={{ fontSize: 15, width: '100%' }}
            value={this.props.selectedPlan}
            validate={[isSelected]}
          />
          <div className="clear-fix" />
        </Scrollbars>
    </div>
  )
}


export default connect(
  state => ({
    selectedPlan: formValueSelector('CustomerPlanSignup')(state, 'selectedPlan')
  })
)(RenderPlanSelection);
