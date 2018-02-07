import filter from 'lodash/filter';
import React from 'react';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';

import ContactInfoReview from '../../components/website/customersignup/contactInfoReview';
import PaymentInfoReview from '../../components/website/customersignup/paymentInfoReview';
import PlanInfoReview from '../../components/website/customersignup/planInfoReview';
import CartTotalReview from '../../components/website/customersignup/cartTotalReview';

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
  return(
    <div className="review-signup-container">
      <ContactInfoReview
        contactAddress={contactAddress}
        contactCity={contactCity}
        contactEmail={contactEmail}
        contactFirstName={contactFirstName}
        contactLastName={contactLastName}
        contactPhone={contactPhone}
        contactUnit={contactUnit}
        contactState={contactState}
        contactZip={contactZip}
        editStep={editStep}
      />
      <PaymentInfoReview
        contactFirstName={contactFirstName}
        contactLastName={contactLastName}
        billingAddress={billingAddress}
        billingCity={billingCity}
        billingState={billingState}
        billingUnit={billingUnit}
        billingZip={billingZip}
        creditCard={creditCard}
        creditCardExpMonth={creditCardExpMonth}
        creditCardExpYear={creditCardExpYear}
        editStep={editStep}
        sameBillingAddress={sameBillingAddress}
      />
      <PlanInfoReview displayPrice={displayPrice} description={description} editStep={editStep} selectedPlan={selectedPlan} />
      <CartTotalReview displayPrice={displayPrice} price={price} />
    </div>
  )
}

export default connect(state => ({ finalValues: getFormValues('CustomerPlanSignup')(state)}))(ReviewPlanForm);
