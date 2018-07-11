import map from 'lodash/map';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Col } from 'antd';
import { AntInput, AntInputNumber, AntRangePicker, AntSelectField, AntStepFormButtons } from '../app/formFields/antReduxFormFields';
// import MenuItem from 'material-ui/MenuItem';

import Spinner from '../app/loading/Spinner';
import { addNewPromo, editPromo } from '../../../actions/formActions';
import planActions from '../../../actions/planActions';
import { allowedCharacters, isRequired, isNotEmpty, isNumber } from '../app/formFields/validateFormFields';

// import FIELDS from '../app/formFields/promoFormFields';
const { fetchAllActivePlans } = planActions;

class PromoForm extends Component {
  state = { confirmLoading: false, isLoading: true, selectOptions: [] };

  componentDidMount = () => {
    // const { id } = this.props.location.query;
    // !id ? this.fetchPromos() : this.fetchPromoForEditing(id)
    this.fetchPlans()
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { serverError } = this.props;
    serverError !== prevProps.serverError && serverError !== undefined && this.setState({ confirmLoading: false });
  }

  fetchPromoForEditing = id => {
    this.props.fetchPromo(id)
    .then(({ data }) => {
      this.setState({ selectedPlans: data.plans }, () => {
        this.props.initialize(data)
        this.fetchPlans()
      })
    })
    .catch((err) => console.log(err))
  }

  fetchPlans = () => {
    this.props.fetchAllActivePlans()
    .then(({data: {activeplans}}) => this.setState({ isLoading: false, selectOptions: map(activeplans, ({planname}) => (planname)) }))
    .catch(() => null)
  }

	handleFormSubmit = (formProps) => {
    this.setState({ confirmLoading: true });
		console.log(formProps);
    // this.props.addNewPromo(formProps)
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
                    name="promocode"
                    component={AntInput}
                    placeholder="Unique Promo Code"
                    validate={[isRequired, allowedCharacters]}
                  />
                </div>
                <div className="input-100">
                  <Col span={4}>
                    <AntSelectField
                      name="discounttype"
                      selectOptions={['$', '%']}
                      tokenSeparators={[',']}
                      validate={[isNotEmpty]}
                      defaultValue={['$']}
                      style={{ width: '100%' }}
                    />
                  </Col>
                  <Col span={20}>
                    <Field
                      hasFeedback
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
                    name="dates"
                    component={AntRangePicker}
                    placeholder="Start and End Date"
                    style={{ width: '100%' }}
                    validate={[isRequired]}
                  />
                </div>
                <div className="input-100">
                  <Field
                    hasFeedback
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
  initialValues: { discounttype: "$" }
})(connect(null, { addNewPromo, editPromo, fetchAllActivePlans })(PromoForm));
