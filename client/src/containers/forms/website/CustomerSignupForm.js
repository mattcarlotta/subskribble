import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';

import { customerRegisterToPlan, resetBillingFieldValues, setBillingFieldValues } from '../../../actions/formActionCreators';
import CustomerContactInfo from './customerContactInfoForm';
import CustomerPaymentInfo from './customerPaymentInfoForm';

class RegisterPlanForm extends Component {
  state = { stepIndex: 0 };

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
          {{0: <CustomerContactInfo onSubmit={this.handleFormSave} />,
            1: <CustomerPaymentInfo
                form="CustomerPaymentForm"
                enableReinitialize={true}
                keepDirtyOnReinitialize={true}
                onClickBackButton={this.handlePrev}
                onSubmit={this.handleFormSave}
                setBillingFieldValues={this.props.setBillingFieldValues}
                resetBillingFieldValues={this.props.resetBillingFieldValues}
              />,
            2: <p>Pick a Plan</p>,
            3: <p>Review</p>,
          }[this.state.stepIndex]}
        </div>
      </div>
    );
  }
}

export default reduxForm({ form: 'RegisterPlanForm' })(connect(null, { customerRegisterToPlan, resetBillingFieldValues, setBillingFieldValues })(RegisterPlanForm));
