import React from 'react';
import PropTypes from 'prop-types';
import {
  address,
  editLink,
  email,
  name,
  location,
  phone,
  reviewContainer,
  reviewDetailsContainer,
} from './contactInfoReview.scss';

const ContactInfoReview = ({
  contactAddress,
  contactCity,
  contactEmail,
  contactFirstName,
  contactLastName,
  contactPhone,
  contactUnit,
  contactState,
  contactZip,
  editStep,
}) => (
  <div className={reviewContainer}>
    <h2 style={{ fontSize: 26 }}>
      <i className="fa fa-address-book" aria-hidden="true" /> Contact
    </h2>
    <div className={reviewDetailsContainer}>
      <p className={name}>
        {contactFirstName} {contactLastName}
        {/* eslint-disable */}
        <span
          className={editLink}
          onClick={editStep ? () => editStep(0) : null}
        >
          Edit
        </span>
        {/* eslint-enable */}
      </p>
      <p className={address}>{contactAddress}</p>
      <p className={address}>{contactUnit}</p>
      <p className={location}>
        {contactCity}, {contactState} {contactZip}
      </p>
      <p className={email}>{contactEmail}</p>
      <p className={phone}>{contactPhone}</p>
    </div>
  </div>
);

export default ContactInfoReview;

ContactInfoReview.propTypes = {
  contactAddress: PropTypes.string,
  contactCity: PropTypes.string,
  contactEmail: PropTypes.string,
  contactFirstName: PropTypes.string,
  contactLastName: PropTypes.string,
  contactPhone: PropTypes.string,
  contactUnit: PropTypes.string,
  contactState: PropTypes.string,
  contactZip: PropTypes.string,
  editStep: PropTypes.func,
};
