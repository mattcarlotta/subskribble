import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { AntInput, AntSelectField, AntStepFormButtons } from '../app/formFields/antReduxFormFields';
import Spinner from '../app/loading/Spinner';
import promoActions from '../../../actions/promoActions';
import { addNewPlan } from '../../../actions/formActions';
import { allowedCharacters, isRequired, isNotEmpty, isFloat, maxLength50 } from '../app/formFields/validateFormFields';

const { fetchPlan } = promoActions;

class PlanForm extends Component {
  state = { confirmLoading: false, isLoading: true };

  componentDidMount = () => {
    const { id } = this.props.location.query;
    !id ? this.setState({ isLoading: false }) : this.fetchPlanForEditing(id)
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { serverError } = this.props;
    serverError !== prevProps.serverError && serverError !== undefined && this.setState({ confirmLoading: false });
  }

  // fetchPlanForEditing = id => {
  //   this.props.fetchPlan(id)
  //   .then(({ data }) => {
  //     this.setState({ discountType: data.discounttype, selectedPlans: data.plans }, () => {
  //         this.props.initialize({
  //         ...data,
  //         dateStamps: [
  //             moment(data.datestamps[0], 'ddd MMM D YYYY HH:mm:ss ZZ'),
  //             moment(data.datestamps[1], 'ddd MMM D YYYY HH:mm:ss ZZ')
  //         ],
  //         maxusage: data.maxusage === 2147483647 ? undefined : data.maxusage
  //       })
  //       this.fetchPlans()
  //     })
  //   })
  //   .catch((err) => console.log(err))
  // }

	handleFormSubmit = (formProps) => {
    this.setState({ confirmLoading: true });
    console.log(formProps);
    this.props.addNewPlan(formProps);
    // const { id } = this.props.location.query;
    // formProps.startdate = formProps.dateStamps[0].format("MMMM DD YYYY")
    // formProps.enddate = formProps.dateStamps[1].format("MMMM DD YYYY")
    // formProps.datestamps = [formProps.dateStamps[0].toString(), formProps.dateStamps[1].toString()]
    // !id ? this.props.addNewPromo(formProps) : this.props.editPromo(id, formProps);
	}

  goBackPage = () => browserHistory.goBack();

  render = () => {
    const { handleSubmit, pristine, submitting } = this.props;
    const { confirmLoading, isLoading } = this.state;

    return (
      isLoading
        ? <Spinner />
        : <div className="new-form-container">
            <div style={{ width: '600px', margin: '0 auto', marginTop: 40, marginBottom: 30 }} className="form-box-container">
              <h1 style={{ textAlign: 'center', marginBottom: 30 }}>
                {!this.props.location.query.id ? 'Create' : 'Edit'} Plan
              </h1>
              <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                <div className="input-100">
                  <Field
                    hasFeedback
                    disabled={confirmLoading}
                    name="planName"
                    component={AntInput}
                    placeholder="Unique Plan Name"
                    validate={[isRequired, allowedCharacters, maxLength50]}
                  />
                </div>
                <div className="input-100">
                  <Field
                    hasFeedback
                    disabled={confirmLoading}
                    name="description"
                    component={AntInput}
                    placeholder="Plan Description"
                    validate={[isRequired, allowedCharacters, maxLength50]}
                  />
                </div>
                <div className="input-100">
                  <Field
                    disabled={confirmLoading}
                    name="amount"
                    addonBefore={<div style={{ width: 20 }}>$</div>}
                    addonAfter={
                      <AntSelectField
                        disabled={confirmLoading}
                        name="billEvery"
                        placeholder="Bill Period"
                        selectOptions={['Weekly', 'Bi-Weekly', 'Monthly', 'Bi-Monthly', 'Quarterly', 'Twice a Year', 'Annually']}
                        className="select-container"
                        style={{ width: '100%' }}
                        tokenSeparators={[',']}
                        defaultValue="Weekly"
                        validate={[isNotEmpty]}
                      />
                    }
                    component={AntInput}
                    placeholder="Plan Price (0.00)"
                    validate={[isRequired, isFloat]}
                  />
                </div>
                <div className="input-100">
                  <Field
                    hasFeedback
                    disabled={confirmLoading}
                    name="setupFee"
                    addonBefore={<div style={{ width: 20 }}>$</div>}
                    component={AntInput}
                    placeholder="Plan Setup Fee (leave empty if none)"
                    validate={[isFloat]}
                  />
                </div>
                <div className="input-100">
                  <AntSelectField
                    disabled={confirmLoading}
                    name="trialPeriod"
                    placeholder="Trial Period (leave empty if none)"
                    selectOptions={['1 Week', '2 Weeks', '1 Month', '2 Months', '3 Months', '6 Months', '1 Year']}
                    style={{ width: '100%' }}
                    tokenSeparators={[',']}
                  />
                </div>
                <hr />
                <AntStepFormButtons
                  backLabel="Back"
                  backStyle={{ height: 50, float: 'left' }}
                  confirmLoading={confirmLoading}
                  onClickBack={this.goBackPage}
                  pristine={pristine}
                  submitLabel="Submit"
                  submitStyle= {{ height: 50, float: 'right' }}
                  submitting={submitting}
                />
              </form>
            </div>
          </div>
        );
  }
};

export default reduxForm({
  form: 'PlanForm',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  initialValues: { billEvery: "Weekly" }
})(connect(state => ({ serverError: state.server.error }), { addNewPlan, fetchPlan })(PlanForm));
