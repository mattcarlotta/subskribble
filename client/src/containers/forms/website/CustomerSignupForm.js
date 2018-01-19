import map from 'lodash/map';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Steps } from 'antd';
import { customerRegisterToPlan, resetBillingFieldValues, setBillingFieldValues } from '../../../actions/formActionCreators';
import RegisterPlanForm from './RegisterPlanForm';
import { ADDRESSFIELDS, billingAddressFields, CONTACTFIELDS, CREDITCARDFIELDS, PLANSELECTIONFIELDS } from '../formfields/customerSignupFields';
const { Step } = Steps;


class CustomerPlanSignup extends Component {
  state = {
    stepIndex: 0,
    stepLabels: ['Contact Information', 'Payment', 'Plan', 'Review'],
    BILLINGADDRESSFIELDS: billingAddressFields(this.props.setBillingFieldValues, this.props.resetBillingFieldValues),
    visited: [],
    wasReviewed: false
  };

  handleFormSave = (formProps) => {
    console.log(formProps);
    this.handleNext();
    // this.props.customerRegisterToPlan(formProps);
  }

  editStep = (number) => this.setState({ stepIndex: number });

  handleNext = () => {
    const { stepIndex, visited } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      visited: visited.concat(stepIndex),
      wasReviewed: visited.length > 2 && true
    })
  }

  handlePrev = () => {
    this.setState({ stepIndex: this.state.stepIndex - 1 });
  }

  render() {
    const { BILLINGADDRESSFIELDS, stepIndex, stepLabels, visited, wasReviewed } = this.state;
    return (
      <div className="customer-signup-bg">
        <div className="customer-signup-container">
          <div className="stepper-container">
            <div className="title">
              <h1>Carlotta Corp</h1>
              <h3>Plan Registration</h3>
            </div>
            <Steps current={stepIndex}>
              {map(stepLabels, (label, key) => (
                <Step
                  key={label}
                  title={label}
                />
              ))}
            </Steps>
          </div>
          {{0: <RegisterPlanForm
                LEFTFIELDS={CONTACTFIELDS}
                leftTitle="Contact Information"
                onSubmit={this.handleNext}
                RIGHTFIELDS={ADDRESSFIELDS}
                rightTitle="Address"
              />,
            1: <RegisterPlanForm
                LEFTFIELDS={BILLINGADDRESSFIELDS}
                leftTitle="Billing Address"
                onClickBack={this.handlePrev}
                onSubmit={this.handleNext}
                RIGHTFIELDS={CREDITCARDFIELDS}
                rightTitle="Credit Card Information"
              />,
          }[stepIndex]}
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'CustomerPlanSignup'
})(connect(null, { customerRegisterToPlan, resetBillingFieldValues, setBillingFieldValues })(CustomerPlanSignup));

/*
2: <RegisterPlanForm
    onClickBack={this.handlePrev}
    onSubmit={this.handleNext}
    PLANSELECTIONFIELDS={PLANSELECTIONFIELDS}
  />,
3: <RegisterPlanForm
    editStep={this.editStep}
    finished={true}
    mainTitle="<span>You're almost done. Please <strong>review</strong> the information below and <strong>subscribe to the plan</strong>.</span>"
    onClickBack={this.handlePrev}
    onSubmit={this.handleFormSave}
    PLANSELECTIONS={PLANSELECTIONFIELDS}
  />
*/
