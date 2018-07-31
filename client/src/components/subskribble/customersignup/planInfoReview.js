import React from 'react';

const PlanInfoReview = ({ displayPrice, description, editStep, selectedPlan }) => (
	<div className="plan-info-container">
		<h2 className="head-title"><i className="material-icons plan-icon" aria-hidden="true" >content_paste</i> Plan</h2>
		<div className="details-container">
			<p className="plan">
				{selectedPlan}
				<span className="edit-link" onClick={ editStep ? () => editStep(1) : null}>Edit</span>
			</p>
			<p className="price">
				<span className="price-sign">$</span>
				{displayPrice}
				<span className="month">/per month</span>
			</p>
			<p className="description">{description}</p>
		</div>
	</div>
)

export default PlanInfoReview;
