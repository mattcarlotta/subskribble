import filter from 'lodash/filter';
import React from 'react';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import ContactInfoReview from '../../../components/customersignup/ContactInfoReview/contactInfoReview.js';
import PaymentInfoReview from '../../../components/customersignup/PaymentInfoReview/paymentInfoReview.js';
import PlanInfoReview from '../../../components/customersignup/PlanInfoReview/planInfoReview.js';
import CartTotalReview from '../../../components/customersignup/CartTotalReview/cartTotalReview.js';
import { reviewSignupContainer } from './registerForm.scss';

const applyPromoToPrice = (amount, appliedPromoCode) => {
  let adjustedPrice = 0.0;
  if (appliedPromoCode) {
    const discount = parseFloat(appliedPromoCode.amount, 10);
    adjustedPrice =
      appliedPromoCode.discounttype === '%'
        ? amount * (discount / 100)
        : discount;
  }
  return adjustedPrice;
};

const getAmountAndDescription = (finalValues, PLANSELECTIONS) => {
  const { amount, description } = filter(
    PLANSELECTIONS,
    ({ planname }) => planname === finalValues.selectedPlan,
  )[0];
  return { amount: parseFloat(amount), description };
};

const ReviewPlanForm = ({
  appliedPromoCode,
  finalValues,
  editStep,
  PLANSELECTIONS,
}) => {
  const { amount, description } = getAmountAndDescription(
    finalValues,
    PLANSELECTIONS,
  );
  const adjustedPrice = applyPromoToPrice(amount, appliedPromoCode);
  const price = amount - adjustedPrice;
  const adjustedPrice2String = adjustedPrice
    .toString()
    .match(/^-?\d+(?:\.\d{0,2})?/)[0];

  return (
    <div className={reviewSignupContainer}>
      <ContactInfoReview {...finalValues} editStep={editStep} />
      <PaymentInfoReview {...finalValues} editStep={editStep} />
      <PlanInfoReview
        {...finalValues}
        displayPrice={amount}
        description={description}
        editStep={editStep}
      />
      <CartTotalReview
        adjustedPrice={adjustedPrice2String}
        appliedPromoCode={appliedPromoCode}
        originalAmount={amount}
        plan={finalValues.selectedPlan}
        price={price}
        promoCode={finalValues.promoCode}
      />
    </div>
  );
};

export default connect(state => ({
  appliedPromoCode: state.promos.appliedPromoCode,
  finalValues: getFormValues('CustomerPlanSignup')(state),
}))(ReviewPlanForm);
