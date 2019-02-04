import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'antd';
import ApplyPromotionalForm from '../../../containers/forms/ApplyPromotionalForm/applyPromotionalForm.js';
import {
  promoCodeField,
  reviewContainer,
  reviewDetailsContainer,
  subtotal,
  taxes,
} from './cartTotalReview.scss';

const CartTotalReview = ({
  adjustedPrice,
  appliedPromoCode,
  originalAmount,
  plan,
  price,
  promoCode,
}) => {
  const tax = (price - price * 0.925).toFixed(2);
  const total = (price + parseFloat(tax)).toFixed(2);
  return (
    <div className={reviewContainer}>
      <h2 style={{ fontSize: 26 }}>
        <i className="fa fa-shopping-cart" aria-hidden="true" /> Total
      </h2>
      <div className={reviewDetailsContainer}>
        <div className={subtotal}>
          <Col span={12}>Subtotal:</Col>
          <Col span={12}>
            <strong style={{ float: 'right' }}>${originalAmount}</strong>
          </Col>
        </div>
        <div className={taxes}>
          <Col span={12}>Sales Tax:</Col>
          <Col span={12}>
            <strong style={{ float: 'right' }}>${tax}</strong>
          </Col>
        </div>
        <div className={promoCodeField}>
          {appliedPromoCode && <Col span={5}>Promo:</Col>}
          <Col span={appliedPromoCode ? 19 : 24}>
            <ApplyPromotionalForm
              adjustedPrice={adjustedPrice}
              appliedPromoCode={appliedPromoCode}
              promoCode={promoCode}
              plan={plan}
            />
          </Col>
        </div>
        <div className="clear-fix" />
        <hr />
        <div className="total">
          <Col span={12}>You Pay:</Col>
          <Col span={12}>
            <strong style={{ float: 'right' }}>${total}</strong>
          </Col>
        </div>
      </div>
    </div>
  );
};

export default CartTotalReview;

CartTotalReview.propTypes = {
  adjustedPrice: PropTypes.string,
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
  originalAmount: PropTypes.number,
  plan: PropTypes.string,
  price: PropTypes.number,
  promoCode: PropTypes.string,
};
