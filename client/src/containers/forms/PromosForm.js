import map from 'lodash/map';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import moment from 'moment';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import {
  AntInput,
  AntInputNumber,
  AntRangePicker,
  AntSelectField,
  AntStepFormButtons,
} from '../app/formFields/antReduxFormFields';

import Spinner from '../../components/app/loading/Spinner';
import { fetchPromo } from '../../actions/promoActions';
import { addNewPromo, editPromo } from '../../actions/formActions';
import { fetchAllActivePlans } from '../../actions/planActions';
import {
  allowedCharacters,
  hasDates,
  isRequired,
  isNotEmpty,
  isNumber,
} from '../app/formFields/validateFormFields';

class PromoForm extends Component {
  state = { isLoading: true, selectOptions: [] };

  componentDidMount = () => {
    const { id } = this.props.location.query;
    if (!id) {
      this.fetchPlans();
    } else {
      this.fetchPromoForEditing(id);
    }
  };

  fetchPromoForEditing = id => {
    this.props
      .fetchPromo(id)
      .then(({ data }) => {
        this.setState(
          { discountType: data.discounttype, selectedPlans: data.plans },
          () => {
            this.props.initialize({
              ...data,
              dateStamps: [moment(data.startdate), moment(data.enddate)],
              maxusage:
                data.maxusage === 2147483647 ? undefined : data.maxusage,
            });
            this.fetchPlans();
          },
        );
      })
      .catch(() => this.props.handleGoBack());
  };

  fetchPlans = () => {
    this.props
      .fetchAllActivePlans()
      .then(({ data: { activeplans } }) =>
        this.setState({
          isLoading: false,
          selectOptions: map(activeplans, ({ planname }) => planname),
        }),
      )
      .catch(() => this.props.handleGoBack());
  };

  handleFormSubmit = formProps => {
    const { id } = this.props.location.query;
    this.props.showButtonLoading();
    const [startdate, enddate] = formProps;
    formProps.startdate = startdate;
    formProps.enddate = enddate;
    if (!id) {
      this.props.addNewPromo(formProps);
    } else {
      this.props.editPromo(id, formProps);
    }
  };

  render = () => {
    const { confirmLoading, handleSubmit, pristine, submitting } = this.props;
    const { isLoading, selectOptions, selectedPlans } = this.state;

    return isLoading ? (
      <Spinner />
    ) : (
      <div className="new-form-container">
        <div
          style={{
            width: '600px',
            margin: '0 auto',
            marginTop: 40,
            marginBottom: 30,
          }}
          className="form-box-container"
        >
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
                placeholder="Click to associate plans to the promotional."
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
                placeholder="Unique promo code"
                validate={[isRequired, allowedCharacters]}
              />
            </div>
            <div className="input-100">
              <Field
                disabled={confirmLoading}
                name="amount"
                addonBefore={
                  <AntSelectField
                    disabled={confirmLoading}
                    name="discounttype"
                    selectOptions={['$', '%']}
                    className="type-container"
                    style={{ width: '100%' }}
                    tokenSeparators={[',']}
                    defaultValue={[this.state.discountType || '$']}
                    validate={[isNotEmpty]}
                  />
                }
                component={AntInput}
                placeholder="Discount amount (use whole numbers)"
                validate={[isRequired, isNumber]}
              />
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
                placeholder="Max usage (leave empty if unlimited)"
                style={{ width: '100%' }}
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
      </div>
    );
  };
}

export default reduxForm({
  form: 'PromoForm',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  initialValues: { discounttype: '$' },
})(
  connect(
    null,
    { addNewPromo, editPromo, fetchPromo, fetchAllActivePlans },
  )(PromoForm),
);

PromoForm.propTypes = {
  location: PropTypes.shape({
    query: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  fetchPromo: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  handleGoBack: PropTypes.func.isRequired,
  fetchAllActivePlans: PropTypes.func.isRequired,
  addNewPromo: PropTypes.func.isRequired,
  editPromo: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
  showButtonLoading: PropTypes.func.isRequired,
};
