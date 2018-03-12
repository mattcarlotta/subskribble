import filter from 'lodash/filter';
import React from 'react';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';

import ContactInfoReview from '../../components/website/customersignup/contactInfoReview';
import PaymentInfoReview from '../../components/website/customersignup/paymentInfoReview';
import PlanInfoReview from '../../components/website/customersignup/planInfoReview';
import CartTotalReview from '../../components/website/customersignup/cartTotalReview';

const ReviewPlanForm = ({ finalValues, editStep, PLANSELECTIONS }) => {
  let { price, description } = filter(PLANSELECTIONS, ({ plan }) => (plan === finalValues.selectedPlan))[0];
  price = parseFloat(price);
  const displayPrice = price.toFixed(2);
  return(
    <div className="review-signup-container">
      <ContactInfoReview {...finalValues} editStep={editStep} />
      <PaymentInfoReview {...finalValues} editStep={editStep}/>
      <PlanInfoReview {...finalValues} displayPrice={displayPrice} description={description} editStep={editStep} />
      <CartTotalReview displayPrice={displayPrice} price={price} />
    </div>
  );
}

export default connect(state => ({ finalValues: getFormValues('CustomerPlanSignup')(state)}))(ReviewPlanForm);
