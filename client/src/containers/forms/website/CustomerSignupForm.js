import map from 'lodash/map';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Steps } from 'antd';
import RegisterPlanForm from './RegisterPlanForm';
import { customerRegisterToPlan } from '../../../actions/formActionCreators';
import { getCustomerFormFields } from '../formfields/customerSignupFields';
const { Step } = Steps;

class CustomerPlanSignup extends Component {
  state = {
    ...getCustomerFormFields(),
    stepIndex: 0,
    stepLabels: ['Contact Information', 'Payment', 'Plan', 'Review'],
    visited: [],
    wasReviewed: false
  };

  editStep = number => this.setState({ ...getCustomerFormFields(number), stepIndex: number })

  handleFormSave = (formProps) => {
    console.log(formProps);
    // this.props.customerRegisterToPlan(formProps);
  }

  handleNext = () => {
    const { stepIndex, visited } = this.state;
    const formKey = stepIndex + 1;

    this.setState({
      ...getCustomerFormFields(formKey),
      stepIndex: formKey,
      visited: visited.concat(stepIndex),
      wasReviewed: visited.length > 1 && true
    })
  }

  handlePrev = () => {
    const formKey = this.state.stepIndex - 1;

    this.setState({ ...getCustomerFormFields(formKey), stepIndex: formKey })
  }

  render() {
    const {
      billingSwitch,
      finished,
      LEFTFIELDS,
      leftTitle,
      mainTitle,
      RIGHTFIELDS,
      rightTitle,
      PLANSELECTIONS,
      PLANSELECTIONFIELDS,
      stepIndex,
      wasReviewed,
      stepLabels
    } = this.state;
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
                  onClick={wasReviewed ? () => this.editStep(key) : undefined}
                  title={label}
                />
              ))}
            </Steps>
          </div>
          <RegisterPlanForm
            billingSwitch={billingSwitch}
            editStep={ finished ? this.editStep : null }
            finished={finished}
            LEFTFIELDS={LEFTFIELDS}
            leftTitle={leftTitle}
            mainTitle={mainTitle}
            onClickBack={ stepIndex > 0 ? this.handlePrev : null }
            onSubmit={ finished ? this.handleFormSave : this.handleNext }
            PLANSELECTIONS={PLANSELECTIONS}
            PLANSELECTIONFIELDS={PLANSELECTIONFIELDS}
            RIGHTFIELDS={RIGHTFIELDS}
            rightTitle={rightTitle}
          />
        </div>
      </div>
    );
  }
}

export default connect(null, { customerRegisterToPlan })(CustomerPlanSignup);
