import React from 'react';

const CartTotalReview = ({ displayPrice, price }) => {
  const tax = (price - price * .925).toFixed(2);
  const total = (price + parseFloat(tax)).toFixed(2);
  return (
    <div className="total-container">
      <h2 className="head-title"><i className="fa fa-shopping-cart" aria-hidden="true"/> Total</h2>
      <div className="details-container">
        <p className="subtotal">
          Subtotal:
          <span className="f-r"><strong>${displayPrice}</strong></span>
        </p>
        <p className="taxes">
          Sales Tax:
          <span className="f-r">${tax}</span>
        </p>
        <hr />
        <p className="total">
          You Pay:
          <span className="f-r"><strong>${total}</strong></span>
        </p>
      </div>
    </div>
  )
}

export default CartTotalReview;
