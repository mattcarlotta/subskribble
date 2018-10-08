import React from 'react';
import PropTypes from 'prop-types';
import { GetCreditCardType } from './getCreditCardType';

const PaymentInfoReview = ({
  contactFirstName,
  contactLastName,
  billingAddress,
  billingCity,
  billingState,
  billingUnit,
  billingZip,
  creditCard,
  creditCardExpMonth,
  creditCardExpYear,
  editStep,
  sameBillingAddress,
}) => {
  const cardType = GetCreditCardType(creditCard.replace(/-/g, ''));
  return (
    <div className="payment-info-container">
      <h2 className="head-title">
        <i className="fa fa-credit-card" aria-hidden="true" /> Payment
      </h2>
      <div className="details-container">
        <p className="creditcard">
          <i
            className={
              cardType ? `fa fa-cc-${cardType}` : 'fa fa-credit-card-alt'
            }
            aria-hidden="true"
          />
          <span className="stars">****</span>
          {creditCard.slice(-4)}
          <span className="experiation">
            Exp: {creditCardExpMonth}/{creditCardExpYear}
          </span>
          {/* eslint-disable */}
          <span
            className="edit-link"
            onClick={editStep ? () => editStep(0) : null}
          >
            Edit
          </span>
          {/* eslint-enable */}
        </p>
        <p className="credit-billing">Billing Address:</p>
        {sameBillingAddress ? (
          <p className="same-location">Same As Contact Address</p>
        ) : (
          [
            <p key="billingName" className="name">
              {contactFirstName} {contactLastName}
            </p>,
            <p key="billingAddress" className="address">
              {billingAddress}
            </p>,
            <p key="billingUnit" className="address">
              {billingUnit}
            </p>,
            <p key="billingLocation" className="location">
              {billingCity}, {billingState} {billingZip}
            </p>,
          ]
        )}
      </div>
    </div>
  );
};

export default PaymentInfoReview;

PaymentInfoReview.propTypes = {
  contactFirstName: PropTypes.string,
  contactLastName: PropTypes.string,
  billingAddress: PropTypes.string,
  billingCity: PropTypes.string,
  billingState: PropTypes.string,
  billingUnit: PropTypes.string,
  billingZip: PropTypes.string,
  creditCard: PropTypes.string,
  creditCardExpMonth: PropTypes.string,
  creditCardExpYear: PropTypes.string,
  editStep: PropTypes.func.isRequired,
  sameBillingAddress: PropTypes.bool,
};
