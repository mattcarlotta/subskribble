import React from 'react';

import ContactForm from '../../../../containers/forms/website/contactForm';

const PricingContact = () => {
  return (
		<div className="pricing-contact-bg">
			<div className="pricing-contact-title-container">
				<h2 className="title">
          Still have some questions?
        </h2>
        <p className="subtitle">Send us a message</p>
			</div>
      <div className="pricing-contact-container">
        <div className="pricing-contact-grid-12">
          <div className="pricing-block">
            <ContactForm />
          </div>
        </div>
      </div>
		</div>
  )
}

export default PricingContact;
