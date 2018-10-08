import React from 'react';
import PropTypes from 'prop-types';

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
  <div className="contact-info-container">
    <h2 className="head-title">
      <i className="fa fa-address-book" aria-hidden="true" /> Contact
    </h2>
    <div className="details-container">
      <p className="name">
        {contactFirstName} {contactLastName}
        {/* eslint-disable */}
        <span
          className="edit-link"
          onClick={editStep ? () => editStep(0) : null}
        >
          Edit
        </span>
        {/* eslint-enable */}
      </p>
      <p className="address">{contactAddress}</p>
      <p className="address">{contactUnit}</p>
      <p className="location">
        {contactCity}, {contactState} {contactZip}
      </p>
      <p className="email">{contactEmail}</p>
      <p className="phone">{contactPhone}</p>
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
