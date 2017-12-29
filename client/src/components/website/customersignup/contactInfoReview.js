import React from 'react';

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
    editStep
}) => {
  return (
    <div className="contact-info-container">
      <h2 className="head-title"><i className="fa fa-address-book" aria-hidden="true" /> Contact</h2>
      <div className="details-container">
        <p className="name">
          {contactFirstName} {contactLastName}
          <span className="edit-link" onClick={() => editStep(1)}>Edit</span>
        </p>
        <p className="address">{contactAddress}</p>
        <p className="address">{contactUnit}</p>
        <p className="location">{contactCity}, {contactState} {contactZip}</p>
        <p className="email">{contactEmail}</p>
        <p className="phone">{contactPhone}</p>
      </div>
    </div>
  )
}

export default ContactInfoReview;
