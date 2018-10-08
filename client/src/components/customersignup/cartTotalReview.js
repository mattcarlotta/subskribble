import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'antd';
import ApplyPromotionalForm from '../../containers/forms/applyPromotionalForm';

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
    <div className="total-container">
      <h2 className="head-title">
        <i className="fa fa-shopping-cart" aria-hidden="true" /> Total
      </h2>
      <div className="details-container">
        <div className="subtotal">
          <Col span={12}>Subtotal:</Col>
          <Col span={12}>
            <strong className="f-r">${originalAmount}</strong>
          </Col>
        </div>
        <div className="taxes">
          <Col span={12}>Sales Tax:</Col>
          <Col span={12}>
            <strong className="f-r">${tax}</strong>
          </Col>
        </div>
        <div className="promo">
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
            <strong className="f-r">${total}</strong>
          </Col>
        </div>
      </div>
    </div>
  );
};

export default CartTotalReview;

CartTotalReview.propTypes = {
  adjustedPrice: PropTypes.string,
  appliedPromoCode: PropTypes.objectOf({
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
