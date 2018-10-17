import React from 'react';
import PropTypes from 'prop-types';
import {
  editLink,
  materialIcons,
  month,
  planIcon,
  priceSign,
  reviewContainer,
  reviewDetailsContainer,
} from './planInfoReview.scss';

const PlanInfoReview = ({
  displayPrice,
  description,
  editStep,
  selectedPlan,
}) => (
  <div className={reviewContainer}>
    <h2 style={{ fontSize: 26 }}>
      <i className={`${materialIcons} ${planIcon}`} aria-hidden="true">
        content_paste
      </i>
      {' Plan'}
    </h2>
    <div className={reviewDetailsContainer}>
      {/* eslint-disable */}
      <p>
        {selectedPlan}
        <span
          className={editLink}
          onClick={editStep ? () => editStep(1) : null}
        >
          Edit
        </span>
      </p>
      {/* eslint-enable */}
      <p style={{ fontSize: 22 }}>
        <span className={priceSign}>$</span>
        {displayPrice}
        <span className={month}>/per month</span>
      </p>
      <p>{description}</p>
    </div>
  </div>
);

export default PlanInfoReview;

PlanInfoReview.propTypes = {
  editStep: PropTypes.func,
  displayPrice: PropTypes.number,
  description: PropTypes.string,
  selectedPlan: PropTypes.string,
};
