import filter from 'lodash/filter';
import each from 'lodash/each';
import React from 'react';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';

const getCreditCardType = (accountNumber) => {
  let cardName;
  const cardTypes = {
    amex: /^3[47][0-9]{0,}$/, //34, 37
    discover: /^(6011|65|64[4-9]|62212[6-9]|6221[3-9]|622[2-8]|6229[01]|62292[0-5])[0-9]{0,}$/,
    diners: /^3(?:0[0-59]{1}|[689])[0-9]{0,}$/, //300-305, 309, 36, 38-39
    jcb: /^(?:2131|1800|35)[0-9]{0,}$/, //2131, 1800, 35 (3528-3589)
    mastercard: /^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[01]|2720)[0-9]{0,}$/, //2221-2720, 51-55
    visa: /^4[0-9]{0,}$/ //4
  }
  const cardKeys = Object.keys(cardTypes);

  each(cardKeys, name => {
    if(cardTypes[name].test(accountNumber)) {
      cardName = (name === "diners") ? "diners-club" : name;
    }
  })

  return cardName;
}

const ReviewPlanForm = ({
  finalValues: {
    billingAddress,
    billingCity,
    billingState,
    billingUnit,
    billingZip,
    contactAddress,
    contactCity,
    contactEmail,
    contactFirstName,
    contactLastName,
    contactPhone,
    contactUnit,
    contactState,
    contactZip,
    creditCard,
    creditCardExpMonth,
    creditCardExpYear,
    sameBillingAddress,
    selectedPlan
  },
  editStep,
  PLANSELECTIONS
}) => {
  let { price, description } = filter(PLANSELECTIONS, ({ plan }) => { return plan === selectedPlan })[0];
  price = parseFloat(price);
  const displayPrice = price.toFixed(2);
  const tax = (price - price * .925).toFixed(2);
  const total = (price + parseFloat(tax)).toFixed(2);
  const cardType = getCreditCardType(creditCard.replace(/-/g, ""));
  return(
    <div className="review-signup-container">
      <div className="contact-info-container">
        <h2 className="head-title"><i className="fa fa-address-book" aria-hidden="true" /> Contact</h2>
        <div className="details-container">
          <p className="name">
            {contactFirstName} {contactLastName}
            <span className="edit-link" onClick={() => editStep(1)}>Edit</span>
          </p>
          <p className="address">{contactAddress}</p>
          <p className="address">{contactUnit}</p>
          <p className="location">{contactCity}, {contactState} {contactZip}</p>
          <p className="email">{contactEmail}</p>
          <p className="phone">{contactPhone}</p>
        </div>
      </div>
      <div className="payment-info-container">
        <h2 className="head-title"><i className="fa fa-credit-card" aria-hidden="true" /> Payment</h2>
        <div className="details-container">
          <p className="creditcard">
            <i className={ cardType ? `fa fa-cc-${cardType}` : "fa fa-credit-card-alt"} aria-hidden="true" />
            <span className="stars">****</span>{creditCard.slice(-4)}
            <span className="experiation">Exp: {creditCardExpMonth}/{creditCardExpYear}</span>
            <span className="edit-link" onClick={() => editStep(2)}>Edit</span>
          </p>
          <p className="credit-billing">Billing Address:</p>
          { sameBillingAddress
            ? <p className="same-location">Same As Contact Address</p>
            : [
                <p key="billingName" className="name">{contactFirstName} {contactLastName}</p>,
                <p key="billingAddress" className="address">{billingAddress}</p>,
                <p key="billingUnit" className="address">{billingUnit}</p>,
                <p key="billingLocation" className="location">{billingCity}, {billingState} {billingZip}</p>
              ]
          }
        </div>
      </div>
      <div className="plan-info-container">
        <h2 className="head-title"><i className="fa fa-sticky-note-o" aria-hidden="true" /> Plan</h2>
        <div className="details-container">
          <p className="plan">
            {selectedPlan}
            <span className="edit-link" onClick={() => editStep(3)}>Edit</span>
          </p>
          <p className="price">
            <span className="price-sign">$</span>
            {displayPrice}
            <span className="month">/per month</span>
          </p>
          <p className="description">{description}</p>
        </div>
      </div>
      <div className="total-container">
        <h2 className="head-title"><i className="fa fa-shopping-cart" aria-hidden="true"></i> Total</h2>
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
    </div>
  )
}

export default connect(state => ({ finalValues: getFormValues('CustomerPlanSignup')(state)}))(ReviewPlanForm);
