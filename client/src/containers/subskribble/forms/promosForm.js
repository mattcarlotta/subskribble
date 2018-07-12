import map from 'lodash/map';
import React, { Component } from 'react';
// import moment from 'moment';
import { reduxForm, Field, change } from 'redux-form';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Col } from 'antd';
import { AntInput, AntInputNumber, AntRangePicker, AntSelectField, AntStepFormButtons } from '../app/formFields/antReduxFormFields';
// import MenuItem from 'material-ui/MenuItem';

import Spinner from '../app/loading/Spinner';
import { addNewPromo, editPromo } from '../../../actions/formActions';
import planActions from '../../../actions/planActions';
import { allowedCharacters, hasDates, isRequired, isNotEmpty, isNumber } from '../app/formFields/validateFormFields';

// import FIELDS from '../app/formFields/promoFormFields';
const { fetchAllActivePlans } = planActions;
//
// const dates = [
//   moment("Wed Jul 11 2018 17:25:22 GMT-0700", 'ddd MMM D YYYY HH:mm:ss ZZ'),
//   moment('Mon Aug 13 2018 17:30:40 GMT-0700', 'ddd MMM D YYYY HH:mm:ss ZZ')
// ]


class PromoForm extends Component {
  state = {
    confirmLoading: false,
    isLoading: true,
    selectOptions: [],
    dates: []
  };

  componentDidMount = () => {
    // const { id } = this.props.location.query;
    // !id ? this.fetchPromos() : this.fetchPromoForEditing(id)
    this.fetchPlans()
    this.props.initialize({ discounttype: '$'})
    // this.setState({ dates: ["July 11, 2018", "Aug 13 2018" ], selectedPlans: ['Carlotta Prime'] }, () =>{
    //   this.props.initialize({
    //     promocode: 'dfshjsfdbhfsdh',
    //     discounttype: '$',
    //     dates,
    //     amount: 80,
    //     plans: ['Carlotta Prime']
    //   })
    // })
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
    formProps.startdate = formProps.dates[0].format("MMMM DD YYYY")
    formProps.enddate = formProps.dates[1].format("MMMM DD YYYY")
    formProps.datestamps = [formProps.dates[0].toString(), formProps.dates[1].toString()]
		console.log(formProps);
    // console.log(formProps.dates[0].toString())
    // console.log(formProps.dates[0].format("MMMM DD YYYY"))
    // console.log(formProps.dates[1].toString())
    // console.log(formProps.dates[1].format("MMMM DD YYYY"))
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
                      name="discounttype"
                      disabled={confirmLoading}
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
                    name="dates"
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
})(connect(null, { addNewPromo, change, editPromo, fetchAllActivePlans })(PromoForm));
