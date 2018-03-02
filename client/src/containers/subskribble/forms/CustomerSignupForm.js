import map from 'lodash/map';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Steps } from 'antd';
import RegisterPlanForm from './RegisterPlanForm';
import { customerRegisterToPlan } from '../../../actions/formActionCreators';
import { getCustomerFormFields } from '../../formfields/customerSignupFields';
const { Step } = Steps;

class CustomerPlanSignup extends Component {
  state = {
    formFields: getCustomerFormFields(),
    stepIndex: 0,
    stepLabels: ['Contact Information', 'Payment', 'Plan', 'Review'],
    visited: [],
    wasReviewed: false
  };

  componentDidUpdate = (prevProps, prevState) => {
    this.state.stepIndex !== prevState.stepIndex && window.scrollTo(0, 0)
  }

  editStep = number => this.setState({ formFields: getCustomerFormFields(number), stepIndex: number })

  handleFormSave = (formProps) => {
    console.log(formProps);
    this.props.onFormSubmit();
    // this.props.customerRegisterToPlan(formProps);
  }

  handleNext = () => {
    const { stepIndex, visited } = this.state;
    const formKey = stepIndex + 1;
    this.setState({
      formFields: getCustomerFormFields(formKey),
      stepIndex: formKey,
      visited: visited.concat(stepIndex).filter((val, idx, arr) => (arr.indexOf(val) === idx)),
      wasReviewed: visited.length > 1 && true
    })
  }

  handleStepClick = key => {

  }

  handlePrev = () => {
    const formKey = this.state.stepIndex - 1;
    this.setState({ formFields: getCustomerFormFields(formKey), stepIndex: formKey })
  }

  render() {
    const { formFields, stepIndex, wasReviewed, stepLabels } = this.state;
    const { confirmLoading } = this.props;
    const finished = stepIndex === 3;
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
                  onClick={wasReviewed && !confirmLoading ? () => this.editStep(key) : undefined}
                  title={label}
                />
              ))}
            </Steps>
          </div>
          <RegisterPlanForm
            {...formFields}
            confirmLoading={confirmLoading}
            finished={finished}
            editStep={!confirmLoading ? this.editStep : null}
            onClickBack={ stepIndex > 0 ? this.handlePrev : null }
            onSubmit={ finished ? this.handleFormSave : this.handleNext }
          />
        </div>
      </div>
    );
  }
}

export default connect(null, { customerRegisterToPlan })(CustomerPlanSignup);
