import React from 'react';
import ApplyPromotionalForm from '../../../containers/subskribble/forms/applyPromotionalForm';
import { Col } from 'antd';

const CartTotalReview = ({ adjustedPrice, appliedPromoCode, displayPrice, originalAmount, plan, price, promoCode }) => {
  const tax = (price - price * .925).toFixed(2);
  const total = (price + parseFloat(tax)).toFixed(2);
  return (
    <div className="total-container">
      <h2 className="head-title"><i className="fa fa-shopping-cart" aria-hidden="true"/> Total</h2>
      <div className="details-container">
        <div className="subtotal">
          <Col span={12}>
            Subtotal:
          </Col>
          <Col span={12}>
            <strong className="f-r">${originalAmount}</strong>
          </Col>
        </div>
        <div className="taxes">
          <Col span={12}>
            Sales Tax:
          </Col>
          <Col span={12}>
            <strong className="f-r">${tax}</strong>
          </Col>
        </div>
        <div className="promo">
          { appliedPromoCode &&
            <Col span={5}>
              Promo:
            </Col>
          }
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
          <Col span={12}>
            You Pay:
          </Col>
          <Col span={12}>
            <strong className="f-r">${total}</strong>
          </Col>
        </div>
      </div>
    </div>
  )
}

export default CartTotalReview;
