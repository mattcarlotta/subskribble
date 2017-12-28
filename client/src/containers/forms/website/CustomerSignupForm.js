import map from 'lodash/map';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFormValues, reduxForm } from 'redux-form';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';

import { customerRegisterToPlan, resetBillingFieldValues, setBillingFieldValues } from '../../../actions/formActionCreators';
import RegisterPlanForm from './RegisterPlanForm';
import { ADDRESSFIELDS, billingAddressFields, CONTACTFIELDS, CREDITCARDFIELDS, PLANSELECTIONFIELDS } from '../formfields/customerSignupFields';

class CustomerPlanSignup extends Component {
  state = {
    stepIndex: 0,
    stepLabels: ['Contact Information', 'Payment', 'Plan', 'Review'],
    BILLINGADDRESSFIELDS: billingAddressFields(this.props.setBillingFieldValues, this.props.resetBillingFieldValues)
  };

  handleFormSave = () => {
    console.log(this.props.finalValues);
    // this.handleNext();
    // this.props.customerRegisterToPlan(formProps);
  }

  handleNext = () => this.setState({ stepIndex: this.state.stepIndex + 1 });

  handlePrev = () => (this.state.stepIndex > 0) && this.setState({stepIndex: this.state.stepIndex - 1});

  render() {
    return (
      <div className="customer-signup-bg">
        <div className="customer-signup-container">
          <div className="stepper-container">
            <div className="title">
              <h1>Carlotta Corp</h1>
              <h3>Carlotta Prime Plan Registration</h3>
            </div>
            <Stepper activeStep={this.state.stepIndex}>
              {map(this.state.stepLabels, (label) => {
                return (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                )
              })}
            </Stepper>
          </div>
          {{0: <RegisterPlanForm
                LEFTFIELDS={CONTACTFIELDS}
                leftTitle="Contact Information"
                onClickBack={this.handlePrev}
                onSubmit={this.handleNext}
                RIGHTFIELDS={ADDRESSFIELDS}
                rightTitle="Address"
              />,
            1: <RegisterPlanForm
                LEFTFIELDS={this.state.BILLINGADDRESSFIELDS}
                leftTitle="Billing Address"
                onClickBack={this.handlePrev}
                onSubmit={this.handleNext}
                RIGHTFIELDS={CREDITCARDFIELDS}
                rightTitle="Credit Card Information"
              />,
            2: <RegisterPlanForm
                onClickBack={this.handlePrev}
                onSubmit={this.handleNext}
                PLANSELECTIONFIELDS={PLANSELECTIONFIELDS}
              />,
            3: <RegisterPlanForm
                finished={true}
                onClickBack={this.handlePrev}
                onSubmit={this.handleFormSave}
                FINALVALUES={this.props.finalValues}
                PLANSELECTIONS={PLANSELECTIONFIELDS}
              />
          }[this.state.stepIndex]}
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'CustomerPlanSignup'
})(connect(state => ({ finalValues: getFormValues('CustomerPlanSignup')(state)}), { customerRegisterToPlan, resetBillingFieldValues, setBillingFieldValues })(CustomerPlanSignup));
