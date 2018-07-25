import map from 'lodash/map';
import React, { Component } from 'react';
import moment from 'moment';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Col } from 'antd';
import { AntInput, AntInputNumber, AntRangePicker, AntSelectField, AntStepFormButtons } from '../app/formFields/antReduxFormFields';

import Spinner from '../app/loading/Spinner';
import promoActions from '../../../actions/promoActions';
import { addNewPromo, editPromo } from '../../../actions/formActions';
import planActions from '../../../actions/planActions';
import { allowedCharacters, hasDates, isRequired, isNotEmpty, isNumber } from '../app/formFields/validateFormFields';

const { fetchPromo } = promoActions;
const { fetchAllActivePlans } = planActions;

class PromoForm extends Component {
  state = { confirmLoading: false, isLoading: true, selectOptions: [], dates: [] };

  componentDidMount = () => {
    const { id } = this.props.location.query;
    !id ? this.fetchPlans() : this.fetchPromoForEditing(id)
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { serverError } = this.props;
    serverError !== prevProps.serverError && serverError !== undefined && this.setState({ confirmLoading: false });
  }

  fetchPromoForEditing = id => {
    this.props.fetchPromo(id)
    .then(({ data }) => {
      this.setState({ discountType: data.discounttype, selectedPlans: data.plans }, () => {
          this.props.initialize({
          ...data,
          dateStamps: [
            moment(data.datestamps[0], 'ddd MMM D YYYY HH:mm:ss ZZ'),
            moment(data.datestamps[1], 'ddd MMM D YYYY HH:mm:ss ZZ')
          ],
          maxusage: data.maxusage === 2147483647 ? undefined : data.maxusage
        })
        this.fetchPlans()
      })
    })
    .catch(() => this.goBackPage())
  }

  fetchPlans = () => {
    this.props.fetchAllActivePlans()
    .then(({data: {activeplans}}) => this.setState({ isLoading: false, selectOptions: map(activeplans, ({planname}) => (planname)) }))
    .catch(() => this.goBackPage())
  }

	handleFormSubmit = (formProps) => {
    this.setState({ confirmLoading: true });
    const { id } = this.props.location.query;
    formProps.startdate = formProps.dateStamps[0].format("MMMM DD YYYY")
    formProps.enddate = formProps.dateStamps[1].format("MMMM DD YYYY")
    formProps.datestamps = [formProps.dateStamps[0].toString(), formProps.dateStamps[1].toString()]
    !id ? this.props.addNewPromo(formProps) : this.props.editPromo(id, formProps);
	}

  goBackPage = () => browserHistory.goBack();

  render = () => {
    const { handleSubmit, pristine, submitting } = this.props;
    const { confirmLoading, isLoading, selectOptions, selectedPlans } = this.state;

    return (
      isLoading
        ? <Spinner />
        : <div className="new-form-container">
            <div style={{ width: '600px', margin: '0 auto', marginTop: 40, marginBottom: 30 }} className="form-box-container">
              <h1 style={{ textAlign: 'center', marginBottom: 30 }}>
                {!this.props.location.query.id ? 'Create' : 'Edit'} Promotional
              </h1>
              <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                <div className="input-100">
                  <AntSelectField
                    className="tag-container"
                    disabled={confirmLoading}
                    name="plans"
                    mode="tags"
                    placeholder="Click here to associate plans to the form."
                    style={{ width: '100%' }}
                    selectOptions={selectOptions}
                    tokenSeparators={[',']}
                    validate={[isNotEmpty]}
                    defaultValue={selectedPlans}
                  />
                </div>
                <div className="input-100">
                  <Field
                    hasFeedback
                    disabled={confirmLoading}
                    name="promocode"
                    component={AntInput}
                    placeholder="Unique Promo Code"
                    validate={[isRequired, allowedCharacters]}
                  />
                </div>
                <div className="input-100">
                  <Col span={4}>
                    <AntSelectField
                      defaultValue={[this.state.discountType || '$']}
                      name="discounttype"
                      disabled={confirmLoading}
                      selectOptions={['$', '%']}
                      style={{ width: '100%' }}
                      tokenSeparators={[',']}
                      validate={[isRequired]}
                    />
                  </Col>
                  <Col span={20}>
                    <Field
                      hasFeedback
                      disabled={confirmLoading}
                      name="amount"
                      component={AntInputNumber}
                      placeholder="Discount Amount"
                      validate={[isRequired, isNumber]}
                      style={{ width: '100%' }}
                    />
                  </Col>
                </div>
                <div className="input-100">
                  <Field
                    hasFeedback
                    disabled={confirmLoading}
                    name="dateStamps"
                    placeholder={['Start Date', 'End Date']}
                    component={AntRangePicker}
                    style={{ width: '100%' }}
                    validate={[isRequired, hasDates]}
                    onBlur={e => e.preventDefault()}
                  />
                </div>
                <div className="input-100">
                  <Field
                    hasFeedback
                    disabled={confirmLoading}
                    name="maxusage"
                    component={AntInputNumber}
                    placeholder="Max Usage (leave empty if unlimited)"
                    style={{ width: '100%' }}
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
  form: 'PromoForm',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  initialValues: { discounttype: "$" }
})(connect(state => ({ serverError: state.server.error }), { addNewPromo, editPromo, fetchPromo, fetchAllActivePlans })(PromoForm));
