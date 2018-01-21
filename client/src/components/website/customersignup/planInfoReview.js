import React from 'react';

const PlanInfoReview = ({ displayPrice, description, editStep, selectedPlan }) => (
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
)

export default PlanInfoReview;
