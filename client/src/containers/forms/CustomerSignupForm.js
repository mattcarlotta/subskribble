import map from 'lodash/map';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Steps } from 'antd';
import RegisterPlanForm from './RegisterPlanForm';

import { subRegisterToPlan } from '../../actions/formActions';
import { getCustomerFormFields } from '../app/formFields/customerSignupFields';
import { fetchAllActivePlans } from '../../actions/planActions';

const { Step } = Steps;
const stepLabels = [
  { title: 'Contact Information', icon: 'mail_outline' },
  { title: 'Plan', icon: 'content_paste' },
  { title: 'Review', icon: 'shopping_cart' },
];

class CustomerPlanSignup extends Component {
  state = {
    formFields: getCustomerFormFields(),
    isLoading: true,
    stepIndex: 0,
    visited: [],
    wasReviewed: false,
  };

  componentDidMount = () => {
    this.props
      .fetchAllActivePlans()
      .then(({ data: { activeplans } }) => {
        if (activeplans) {
          this.setState({ isLoading: false, plans: activeplans });
        } else {
          this.props.handleGoBack();
        }
      })
      .catch(() => this.props.handleGoBack());
  };

  editStep = number =>
    this.setState({
      formFields: getCustomerFormFields(number),
      stepIndex: number,
    });

  handleFormSave = formProps => {
    this.props.showButtonLoading();
    this.props.subRegisterToPlan(formProps);
  };

  handleNext = () => {
    const { stepIndex, visited } = this.state;
    const formKey = stepIndex + 1;
    this.setState({
      formFields: getCustomerFormFields(formKey),
      stepIndex: formKey,
      visited: visited
        .concat(stepIndex)
        .filter((val, idx, arr) => arr.indexOf(val) === idx),
      wasReviewed: visited.length > 0 && true,
    });
  };

  handlePrev = () => {
    this.setState(prevState => {
      const formKey = prevState.stepIndex - 1;
      return {
        formFields: getCustomerFormFields(formKey),
        stepIndex: formKey,
      };
    });
  };

  render() {
    const { confirmLoading } = this.props;
    const { formFields, isLoading, plans, stepIndex, wasReviewed } = this.state;
    const finished = stepIndex === 2;
    return isLoading ? null : (
      <div className="customer-signup-bg">
        <div className="customer-signup-container">
          <div className="stepper-container">
            <div className="title">
              <h1>Subscriber Registration</h1>
            </div>
            <Steps current={stepIndex}>
              {map(stepLabels, ({ title, icon }, key) => (
                <Step
                  className={wasReviewed ? 'fix-cursor' : ''}
                  icon={<i className="material-icons">{icon}</i>}
                  key={key}
                  onClick={
                    wasReviewed && !confirmLoading
                      ? () => this.editStep(key)
                      : null
                  }
                  title={title}
                />
              ))}
            </Steps>
          </div>
          <RegisterPlanForm
            {...formFields}
            confirmLoading={confirmLoading}
            finished={finished}
            editStep={!confirmLoading ? this.editStep : null}
            onClickBack={
              stepIndex > 0 ? this.handlePrev : this.props.handleGoBack
            }
            onSubmit={finished ? this.handleFormSave : this.handleNext}
            plans={plans}
            showPlans={stepIndex === 1 || false}
            showContactInfo={stepIndex === 0 || false}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { fetchAllActivePlans, subRegisterToPlan },
)(CustomerPlanSignup);

CustomerPlanSignup.propTypes = {
  handleGoBack: PropTypes.func.isRequired,
  fetchAllActivePlans: PropTypes.func.isRequired,
  subRegisterToPlan: PropTypes.func.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
  showButtonLoading: PropTypes.func.isRequired,
};