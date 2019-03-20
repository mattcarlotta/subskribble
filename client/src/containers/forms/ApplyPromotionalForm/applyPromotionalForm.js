import isEmpty from 'lodash/isEmpty';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import { Col, Tag } from 'antd';
import { AntInput } from 'containers/app/formFields/antReduxFormFields.js';
import { applyPromo, resetPromo } from 'actions/formActions.js';
import { allowedCharacters } from 'containers/app/formFields/validateFormFields.js';

export class ApplyPromotional extends Component {
  state = { value: '' };

  componentDidMount = () => {
    const { applyPromo, promoCode, plan } = this.props;
    if (promoCode) applyPromo(promoCode, plan);
  };

  handlePromoSubmit = () => {
    const { applyPromo, plan } = this.props;
    const { value } = this.state;
    if (value && plan) applyPromo(value, plan);
  };

  handleChange = e => this.setState({ value: e.target.value });

  handleRemoveAppliedPromo = () =>
    this.setState({ value: '' }, () => this.props.resetPromo());

  showAppliedPromo = () => {
    const { discounttype, amount } = this.props.appliedPromoCode;
    return discounttype === '$'
      ? `${discounttype}${amount}`
      : `${amount}${discounttype}`;
  };

  render = () => (
    <div
      style={{ float: this.props.appliedPromoCode ? 'right' : 'none' }}
      className="promo-form"
    >
      {isEmpty(this.props.appliedPromoCode) ? (
        <span className="apply-promo-form">
          <Col span={18} style={{ paddingRight: '5px', marginTop: '-3px' }}>
            <Field
              name="promoCode"
              component={AntInput}
              placeholder="Add Promo Code"
              style={{ width: '100%' }}
              onChange={this.handleChange}
              value={this.state.value}
              validate={[allowedCharacters]}
            />
          </Col>
          <Col span={6}>
            <button
              type="button"
              className="ant-btn ant-btn-primary"
              style={{ width: '100%' }}
              onClick={this.handlePromoSubmit}
            >
              Apply
            </button>
          </Col>
        </span>
      ) : (
        <span className="applied-promo">
          <Tag className="tag" closable onClose={this.handleRemoveAppliedPromo}>
            {`${this.showAppliedPromo()} OFF`}
          </Tag>
          <div style={{ textAlign: 'right' }}>
            (-$
            {this.props.adjustedPrice})
          </div>
        </span>
      )}
    </div>
  );
}

ApplyPromotional.propTypes = {
  adjustedPrice: PropTypes.string.isRequired,
  appliedPromoCode: PropTypes.shape({
    amount: PropTypes.number,
    discounttype: PropTypes.string,
    enddate: PropTypes.string,
    id: PropTypes.string,
    key: PropTypes.number,
    maxusage: PropTypes.number,
    plans: PropTypes.arrayOf(PropTypes.string),
    promocode: PropTypes.string,
    startdate: PropTypes.string,
    status: PropTypes.string,
    totalusage: PropTypes.number,
    userid: PropTypes.string,
  }),
  applyPromo: PropTypes.func.isRequired,
  promoCode: PropTypes.string,
  plan: PropTypes.string,
  resetPromo: PropTypes.func.isRequired,
};

export default connect(
  null,
  { applyPromo, resetPromo },
)(ApplyPromotional);
