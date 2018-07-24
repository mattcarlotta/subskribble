import filter from 'lodash/filter';
import React from 'react';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';

import ContactInfoReview from '../../../../components/subskribble/customersignup/contactInfoReview';
import PaymentInfoReview from '../../../../components/subskribble/customersignup/paymentInfoReview';
import PlanInfoReview from '../../../../components/subskribble/customersignup/planInfoReview';
import CartTotalReview from '../../../../components/subskribble/customersignup/cartTotalReview';

const ReviewPlanForm = ({ appliedPromoCode, finalValues, editStep, PLANSELECTIONS }) => {
  let { amount, description } = filter(PLANSELECTIONS, ({ planname }) => (planname === finalValues.selectedPlan))[0];
  amount = parseFloat(amount);
  const displayPrice = amount.toFixed(2);
  console.log('finalValues', finalValues);
  return(
    <div className="review-signup-container">
      <ContactInfoReview {...finalValues} editStep={editStep} />
      <PaymentInfoReview {...finalValues} editStep={editStep}/>
      <PlanInfoReview {...finalValues} displayPrice={displayPrice} description={description} editStep={editStep} />
      <CartTotalReview
        appliedPromoCode={appliedPromoCode}
        displayPrice={displayPrice}
        plan={finalValues.selectedPlan}
        price={amount}
        promoCode={finalValues.promoCode}
      />
    </div>
  );
}

export default connect(state => ({
  appliedPromoCode: state.promos.appliedPromoCode,
  finalValues: getFormValues('CustomerPlanSignup')(state),
}))(ReviewPlanForm);
