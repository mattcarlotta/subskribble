import map from 'lodash/map';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';

import { customerRegisterToPlan, resetBillingFieldValues, setBillingFieldValues } from '../../../actions/formActionCreators';
import RegisterPlanForm from './RegisterPlanForm';
import { ADDRESSFIELDS, billingAddressFields, CONTACTFIELDS, CREDITCARDFIELDS } from '../formfields/customerSignupFields';

class CustomerPlanSignup extends Component {
  state = {
    stepIndex: 0,
    stepLabels: ['Contact Information', 'Payment', 'Plan', 'Review'],
    BILLINGADDRESSFIELDS: billingAddressFields(this.props.setBillingFieldValues, this.props.resetBillingFieldValues)
  };

  handleFormSave = (formProps) => {
    console.log(formProps);
    this.handleNext();
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
                onSubmit={this.handleFormSave}
                RIGHTFIELDS={CREDITCARDFIELDS}
                rightTitle="Credit Card Information"
              />,
            2: <p>Pick a Plan</p>,
            3: <p>Review</p>,
          }[this.state.stepIndex]}
        </div>
      </div>
    );
  }
}

export default reduxForm({ form: 'CustomerPlanSignup' })(connect(null, { customerRegisterToPlan, resetBillingFieldValues, setBillingFieldValues })(CustomerPlanSignup));
