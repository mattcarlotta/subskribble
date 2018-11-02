import React from 'react';
import PropTypes from 'prop-types';
import { GetCreditCardType } from '../GetCreditCardType/getCreditCardType';
import {
  address,
  creditBilling,
  editLink,
  experation,
  name,
  location,
  reviewContainer,
  reviewDetailsContainer,
  stars,
} from './paymentInfoReview.scss';

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
    <div className={reviewContainer}>
      <h2 style={{ fontSize: 26 }}>
        <i className="fa fa-credit-card" aria-hidden="true" /> Payment
      </h2>
      <div className={reviewDetailsContainer}>
        <p style={{ fontSize: 25 }}>
          <i
            className={
              cardType ? `fa fa-cc-${cardType}` : 'fa fa-credit-card-alt'
            }
            aria-hidden="true"
          />
          <span className={stars}>****</span>
          {creditCard.slice(-4)}
          <span className={experation}>
            Exp: {creditCardExpMonth}/{creditCardExpYear}
          </span>
          {/* eslint-disable */}
          <span
            className={editLink}
            onClick={editStep ? () => editStep(0) : null}
          >
            Edit
          </span>
          {/* eslint-enable */}
        </p>
        <p className={creditBilling}>Billing Address:</p>
        {sameBillingAddress ? (
          <p>Same As Contact Address</p>
        ) : (
          [
            <p key="billingName" className={name}>
              {contactFirstName} {contactLastName}
            </p>,
            <p key="billingAddress" className={address}>
              {billingAddress}
            </p>,
            <p key="billingUnit" className={address}>
              {billingUnit}
            </p>,
            <p key="billingLocation" className={location}>
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
  editStep: PropTypes.func,
  sameBillingAddress: PropTypes.bool,
};
