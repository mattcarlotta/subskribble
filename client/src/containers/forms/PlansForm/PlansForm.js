import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import {
  AntInput,
  AntSelectField,
  AntStepFormButtons,
} from '../../app/formFields/antReduxFormFields.js';

import Spinner from '../../../components/app/loading/Spinner/Spinner.js';
import { fetchPlan } from '../../../actions/planActions.js';
import { addNewPlan, editPlan } from '../../../actions/formActions.js';
import {
  allowedCharacters,
  isRequired,
  isNotEmpty,
  isFloat,
  maxLength40,
} from '../../app/formFields/validateFormFields.js';
import { formBoxContainer, input100 } from '../../../styles/styles.scss';

class PlanForm extends Component {
  state = {
    billEveryDefault: 'Weekly',
    isEditing: false,
    isLoading: true,
    trialPeriodDefault: undefined,
  };

  componentDidMount = () => {
    const { id } = this.props.location.query;
    if (!id) {
      this.setState({ isLoading: false });
    } else {
      this.fetchPlanForEditing(id);
    }
  };

  fetchPlanForEditing = id => {
    this.props
      .fetchPlan(id)
      .then(({ data }) =>
        this.setState(
          {
            billEveryDefault: data.billevery,
            isEditing: true,
            isLoading: false,
            trialPeriodDefault: data.trialperiod || undefined,
          },
          () => this.props.initialize({ ...data }),
        ),
      )
      .catch(() => this.props.handleGoBack());
  };

  handleFormSubmit = formProps => {
    const { id } = this.props.location.query;
    this.props.showButtonLoading();
    if (!id) {
      this.props.addNewPlan(formProps);
    } else {
      this.props.editPlan(id, formProps);
    }
  };

  render = () => {
    const { confirmLoading, handleSubmit, pristine, submitting } = this.props;
    const {
      billEveryDefault,
      isEditing,
      isLoading,
      trialPeriodDefault,
    } = this.state;

    return isLoading ? (
      <Spinner />
    ) : (
      <div
        style={{
          width: '600px',
          margin: '0 auto',
          marginTop: 40,
          marginBottom: 30,
        }}
        className={formBoxContainer}
      >
        <h1 style={{ textAlign: 'center', marginBottom: 30 }}>
          {!this.props.location.query.id ? 'Create' : 'Edit'} Plan
        </h1>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <div className={input100}>
            <Field
              hasFeedback
              disabled={confirmLoading || isEditing}
              name="planname"
              component={AntInput}
              placeholder="Unique Plan Name"
              validate={[isRequired, allowedCharacters, maxLength40]}
            />
          </div>
          <div className={input100}>
            <Field
              hasFeedback
              disabled={confirmLoading}
              name="description"
              component={AntInput}
              placeholder="Plan description"
              validate={[isRequired, allowedCharacters, maxLength40]}
            />
          </div>
          <div className={input100}>
            <Field
              disabled={confirmLoading}
              name="amount"
              addonBefore={<div style={{ width: 20 }}>$</div>}
              addonAfter={
                <AntSelectField
                  disabled={confirmLoading}
                  name="billevery"
                  placeholder="Bill Period"
                  selectOptions={[
                    'Weekly',
                    'Bi-Weekly',
                    'Monthly',
                    'Bi-Monthly',
                    'Quarterly',
                    'Twice a Year',
                    'Annually',
                  ]}
                  className="select-container"
                  style={{ width: '100%' }}
                  tokenSeparators={[',']}
                  defaultValue={billEveryDefault}
                  validate={[isNotEmpty]}
                />
              }
              component={AntInput}
              placeholder="Plan pricing (0.00)"
              validate={[isRequired, isFloat]}
            />
          </div>
          <div className={input100}>
            <Field
              hasFeedback
              disabled={confirmLoading}
              name="setupfee"
              addonBefore={<div style={{ width: 20 }}>$</div>}
              component={AntInput}
              placeholder="Plan setup fee (leave empty if none)"
              validate={[isFloat]}
            />
          </div>
          <div className={input100}>
            <AntSelectField
              disabled={confirmLoading}
              name="trialperiod"
              placeholder="Trial period (leave empty if none)"
              selectOptions={[
                '(none)',
                '1 Week',
                '2 Weeks',
                '1 Month',
                '2 Months',
                '3 Months',
                '6 Months',
                '1 Year',
              ]}
              style={{ width: '100%' }}
              tokenSeparators={[',']}
              defaultValue={trialPeriodDefault}
            />
          </div>
          <hr />
          <AntStepFormButtons
            backLabel="Back"
            backStyle={{ height: 50, float: 'left' }}
            confirmLoading={confirmLoading}
            onClickBack={this.props.handleGoBack}
            pristine={pristine}
            submitLabel="Submit"
            submitStyle={{ height: 50, float: 'right' }}
            submitting={submitting}
          />
        </form>
      </div>
    );
  };
}

export default reduxForm({
  form: 'PlanForm',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  initialValues: { billevery: 'Weekly' },
})(
  connect(
    null,
    { addNewPlan, editPlan, fetchPlan },
  )(PlanForm),
);

PlanForm.propTypes = {
  location: PropTypes.shape({
    query: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  fetchPlan: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  handleGoBack: PropTypes.func.isRequired,
  addNewPlan: PropTypes.func.isRequired,
  editPlan: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
  showButtonLoading: PropTypes.func.isRequired,
};
