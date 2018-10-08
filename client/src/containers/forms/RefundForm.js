import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import {
  AntInput,
  AntFormFields,
  AntSelectField,
  AntStepFormButtons,
} from '../app/formFields/antReduxFormFields';

import Spinner from '../../components/app/loading/Spinner';
import FIELDS from '../app/formFields/refundTransactionFormFields';
import { isFloat, isRequired } from '../app/formFields/validateFormFields';
import {
  fetchTransaction,
  refundAction,
} from '../../actions/transactionActions';

class RefundForm extends Component {
  state = { isLoading: true };

  componentDidMount = () => {
    const { id } = this.props.location.query;
    if (id) {
      this.props.handleGoBack();
    } else {
      this.fetchTransactionToRefund(id);
    }
  };

  fetchTransactionToRefund = id => {
    this.props
      .fetchTransaction(id)
      .then(({ data }) =>
        this.setState({ isLoading: false }, () =>
          this.props.initialize({ ...data, transactiontype: 'Refund' }),
        ),
      )
      .catch(() => this.props.handleGoBack());
  };

  handleFormSubmit = formProps => {
    const { transactiontype } = formProps;
    formProps.transactiontype = transactiontype.toLowerCase();
    this.props.showButtonLoading();
    this.props.refundAction(formProps);
  };

  render = () =>
    this.state.isLoading ? (
      <Spinner />
    ) : (
      <div className="new-form-container">
        <div
          style={{ width: '650px', margin: '40px auto 30px' }}
          className="form-box-container"
        >
          <h1 style={{ textAlign: 'center', marginBottom: 30 }}>
            Refund/Credit Transaction
          </h1>
          <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
            <div className="input-100">
              <AntSelectField
                defaultValue="Refund"
                name="transactiontype"
                disabled={this.props.confirmLoading}
                selectOptions={['Refund', 'Credit']}
                style={{ width: '100%' }}
                tokenSeparators={[',']}
                validate={[isRequired]}
              />
            </div>
            <div className="input-100">
              <Field
                disabled={this.props.confirmLoading}
                name="amount"
                addonBefore={<div style={{ width: 20 }}>$</div>}
                component={AntInput}
                placeholder="Refund/Credit Amount (0.00)"
                validate={[isRequired, isFloat]}
              />
            </div>
            <AntFormFields FIELDS={FIELDS} />
            <hr />
            <AntStepFormButtons
              backLabel="Back"
              backStyle={{ height: 50, float: 'left' }}
              column={12}
              confirmLoading={this.props.confirmLoading}
              onClickBack={this.props.handleGoBack}
              pristine={this.props.pristine}
              submitLabel="Submit"
              submitStyle={{ height: 50, float: 'right' }}
              submitting={this.props.submitting}
            />
          </form>
        </div>
      </div>
    );
}

export default reduxForm({
  form: 'RefundForm',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(
  connect(
    null,
    { fetchTransaction, refundAction },
  )(RefundForm),
);

RefundForm.propTypes = {
  location: PropTypes.shape({
    query: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  handleGoBack: PropTypes.func.isRequired,
  fetchTransaction: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  showButtonLoading: PropTypes.func.isRequired,
  refundAction: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
  pristine: PropTypes.func.isRequired,
  submitting: PropTypes.func.isRequired,
};
