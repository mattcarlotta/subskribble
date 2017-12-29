import map from 'lodash/map';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';

import { customerRegisterToPlan, resetBillingFieldValues, setBillingFieldValues } from '../../../actions/formActionCreators';
import RegisterPlanForm from './RegisterPlanForm';
import { ADDRESSFIELDS, billingAddressFields, CONTACTFIELDS, CREDITCARDFIELDS, PLANSELECTIONFIELDS } from '../formfields/customerSignupFields';

class CustomerPlanSignup extends Component {
  state = {
    stepIndex: 1,
    stepLabels: ['Contact Information', 'Payment', 'Plan', 'Review'],
    BILLINGADDRESSFIELDS: billingAddressFields(this.props.setBillingFieldValues, this.props.resetBillingFieldValues)
  };

  handleFormSave = () => {
    console.log(this.props.finalValues);
    // this.handleNext();
    // this.props.customerRegisterToPlan(formProps);
  }

  editStep = (number) => this.setState({ stepIndex: number });

  handleNext = () => this.setState({ stepIndex: this.state.stepIndex + 1 });

  handlePrev = () => (this.state.stepIndex > 1) && this.setState({stepIndex: this.state.stepIndex - 1});

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
          {{1: <RegisterPlanForm
                LEFTFIELDS={CONTACTFIELDS}
                leftTitle="Contact Information"
                onSubmit={this.handleNext}
                RIGHTFIELDS={ADDRESSFIELDS}
                rightTitle="Address"
              />,
            2: <RegisterPlanForm
                LEFTFIELDS={this.state.BILLINGADDRESSFIELDS}
                leftTitle="Billing Address"
                onClickBack={this.handlePrev}
                onSubmit={this.handleNext}
                RIGHTFIELDS={CREDITCARDFIELDS}
                rightTitle="Credit Card Information"
              />,
            3: <RegisterPlanForm
                onClickBack={this.handlePrev}
                onSubmit={this.handleNext}
                PLANSELECTIONFIELDS={PLANSELECTIONFIELDS}
              />,
            4: <RegisterPlanForm
                editStep={this.editStep}
                finished={true}
                mainTitle="<span>You're almost done. Please <strong>review</strong> the information below and <strong>subscribe to the plan</strong>.</span>"
                onClickBack={this.handlePrev}
                onSubmit={this.handleFormSave}
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
})(connect(null, { customerRegisterToPlan, resetBillingFieldValues, setBillingFieldValues })(CustomerPlanSignup));
