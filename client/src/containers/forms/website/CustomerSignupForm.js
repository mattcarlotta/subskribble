import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';

import { saveFormRegisterInfo } from '../../../actions/formActionCreators';
import CustomerContactInfo from './customerContactInfoForm';
import CustomerPaymentInfo from './customerPaymentInfoForm';
// import SubmitButton from '../formfields/renderSubmitButton';

class RegisterPlanForm extends Component {
  state = {
    finished: false,
    stepIndex: 0,
  };

  handleFormSave = (formProps) => {
    console.log(formProps);
    this.handleNext();
    // this.props.saveFormRegisterInfo(formProps);
  }

  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <CustomerContactInfo onSubmit={formProps => this.handleFormSave(formProps)} />;
      case 1:
        return <CustomerPaymentInfo onClickBackButton={this.handlePrev} onSubmit={formProps => this.handleFormSave(formProps)} />;
      case 2:
        return 'This is the bit I really care about!';
      case 3:
        return 'This is the bit I really care about!';
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  render() {
    const { stepIndex} = this.state;
    return (
      <div className="customer-signup-bg">
        <div className="customer-signup-container">
          <div className="stepper-container">
            <div className="title">
              <h1>Carlotta Corp</h1>
              <h3>Carlotta Prime Plan Registration</h3>
            </div>
            <Stepper activeStep={stepIndex}>
              <Step>
                <StepLabel>Contact Information</StepLabel>
              </Step>
              <Step>
                <StepLabel>Payment</StepLabel>
              </Step>
              <Step>
                <StepLabel>Plan</StepLabel>
              </Step>
              <Step>
                <StepLabel>Review</StepLabel>
              </Step>
            </Stepper>
          </div>
          {this.getStepContent(stepIndex)}
        </div>
      </div>
    );
  }
}

export default reduxForm({ form: 'RegisterPlanForm' })(connect(null, { saveFormRegisterInfo })(RegisterPlanForm));
