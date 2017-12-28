import filter from 'lodash/filter';
import React from 'react';

const ReviewPlanForm = ({ FINALVALUES, PLANSELECTIONS }) => {
  const {
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
    selectedPlan
  } = FINALVALUES;
  const { price, description } = filter(PLANSELECTIONS, ({ plan }) => { return plan === selectedPlan })[0];
  return(
    <div className="review-signup-container">
      <div className="contact-info-container">
        <h2><i className="fa fa-address-book" aria-hidden="true" /> Contact</h2>
        <p>{contactFirstName}{contactLastName}</p>
        <p>{contactAddress}{contactUnit}</p>
        <p>{contactCity},{contactState} {contactZip}</p>
        <p>{contactEmail}</p>
        <p>{contactPhone}</p>
      </div>
      <div className="payment-info-container">
        <h2><i className="fa fa-credit-card" aria-hidden="true" /> Payment</h2>
        <p>Credit card ending in {creditCard.slice(-4)}, Exp: {creditCardExpMonth}/{creditCardExpYear}</p>
        <p>{contactFirstName}{contactLastName}</p>
        <p>{billingAddress}{billingUnit}</p>
        <p>{billingCity},{billingState} {billingZip}</p>
      </div>
      <div className="plan-info-container">
        <h2><i className="material-icons">content_paste</i> Plan</h2>
        <p>{selectedPlan}</p>
        <p>${price}/per month</p>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default ReviewPlanForm;
