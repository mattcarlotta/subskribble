import map from 'lodash/map';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Steps } from 'antd';
import RegisterPlanForm from './RegisterPlanForm';
import { customerRegisterToPlan } from '../../../actions/formActionCreators';
import {
  ADDRESSFIELDS,
  BILLINGADDRESSFIELDS,
  CONTACTFIELDS,
  CREDITCARDFIELDS,
  PLANSELECTIONFIELDS
} from '../formfields/customerSignupFields';
const { Step } = Steps;

class CustomerPlanSignup extends Component {
  state = {
    stepIndex: 0,
    stepLabels: ['Contact Information', 'Payment', 'Plan', 'Review'],
    visited: [],
    wasReviewed: false
  };

  editStep = (number) => this.setState({ stepIndex: number - 1 });

  handleFormSave = (formProps) => {
    console.log(formProps);
    // this.props.customerRegisterToPlan(formProps);
  }

  handleNext = () => {
    const { stepIndex, visited } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      visited: visited.concat(stepIndex),
      wasReviewed: visited.length > 1 && true
    })
  }

  handlePrev = () => this.setState({ stepIndex: this.state.stepIndex - 1 });

  render() {
    const { stepIndex, stepLabels, wasReviewed } = this.state;
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
                  className={wasReviewed ? "fix-cursor" : "" }
                  key={label}
                  onClick={wasReviewed ? () => this.editStep(key+1) : undefined}
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
                  billingSwitch={true}
                  LEFTFIELDS={BILLINGADDRESSFIELDS}
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
                  editStep={this.editStep}
                  finished={true}
                  mainTitle="<span>You're almost done. Please <strong>review</strong> the information below and <strong>subscribe to the plan</strong>.</span>"
                  onClickBack={this.handlePrev}
                  onSubmit={this.handleFormSave}
                  PLANSELECTIONS={PLANSELECTIONFIELDS}
                />
          }[stepIndex]}
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'CustomerPlanSignup'
})(connect(null, { customerRegisterToPlan })(CustomerPlanSignup));
