import filter from 'lodash/filter';
import React from 'react';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';

import ContactInfoReview from '../../../../components/subskribble/customersignup/contactInfoReview';
import PaymentInfoReview from '../../../../components/subskribble/customersignup/paymentInfoReview';
import PlanInfoReview from '../../../../components/subskribble/customersignup/planInfoReview';
import CartTotalReview from '../../../../components/subskribble/customersignup/cartTotalReview';

const applyPromoToPrice = (amount, appliedPromoCode) => {
	let adjustedPrice = 0.00;
	if (appliedPromoCode) {
		const discount = parseInt(appliedPromoCode.amount, 10);
		adjustedPrice = (appliedPromoCode.discounttype === '%')
			? (amount * (discount/100))
			: discount
	}
	return adjustedPrice.toFixed(2);
}

const getAmountAndDescription = (finalValues, PLANSELECTIONS) => {
	const { amount, description } = filter(PLANSELECTIONS, ({ planname }) => (planname === finalValues.selectedPlan))[0];
	return { amount: parseFloat(amount), description };
}


const ReviewPlanForm = ({ appliedPromoCode, finalValues, editStep, PLANSELECTIONS }) => {
	const { amount, description } = getAmountAndDescription(finalValues, PLANSELECTIONS)
	const adjustedPrice = applyPromoToPrice(amount, appliedPromoCode);
	const price = amount - adjustedPrice;

	return(
		<div className="review-signup-container">
			<ContactInfoReview {...finalValues} editStep={editStep} />
			<PaymentInfoReview {...finalValues} editStep={editStep}/>
			<PlanInfoReview {...finalValues} displayPrice={amount} description={description} editStep={editStep} />
			<CartTotalReview
				adjustedPrice={adjustedPrice}
				appliedPromoCode={appliedPromoCode}
				originalAmount={amount}
				plan={finalValues.selectedPlan}
				price={price}
				promoCode={finalValues.promoCode}
			/>
		</div>
	);
}

export default connect(state => ({
	appliedPromoCode: state.promos.appliedPromoCode,
	finalValues: getFormValues('CustomerPlanSignup')(state),
}))(ReviewPlanForm);
