import React from 'react';

const PricingFAQs = () => {
  return (
		<div className="pricing-faqs-bg">
			<div className="pricing-faqs-title-container">
				<h2 className="title">Frequently asked questions</h2>
			</div>
      <div className="pricing-faqs-container">
        <div className="pricing-faqs-grid-6">
          <div className="pricing-block">
            <h3>Is rocketbiller PCI compliant?</h3>
            <p>
              Yes, rocketbiller complies with the Payment Card Industry Compliance Level III standards. The Payment Card Industry Data Security Standard (PCI DSS) is a set of requirements designed to ensure that ALL companies that process, store or transmit credit card information maintain a secure environment. This includes any merchant that has a Merchant ID (MID).
            </p>
            <p>
              The Payment Card Industry Security Standards Council (PCI SSC) was launched on September 7, 2006 to manage the ongoing evolution of the Payment Card Industry (PCI) security standards with focus on improving payment account security throughout the transaction process. The PCI DSS is administered and managed by the  <a href="https://www.pcisecuritystandards.org" target="_blank" rel="noopener noreferrer"><strong>PCI SSC</strong></a>, an independent body that was created by the major payment card brands (Visa, MasterCard, American Express, Discover and JCB).
            </p>
            <p>
              It is important to note, the payment brands and acquirers are responsible for enforcing compliance, not the PCI council.
            </p>
            <p>
              A copy of the PCI DSS is available <a href="https://www.pcisecuritystandards.org/security_standards/index.php?id=pci_dss_v1-2.pdf" target="_blank" rel="noopener noreferrer"><strong>here</strong></a>
            </p>
            <br />
            <h3>What is rocketbiller?</h3>
            <p>
              Rocketbiller is a recurring billing platform designed for many types of businesses and organizations such as schools, gyms, service providers, doctors, SaaS, software companies and those that need to bill their customers on a regular basis. Whether it's monthly, annually or one-time charges, our platform provides the tools you need for your business to bill and invoice your customers.
            </p>
            <ul>
              <li>Support for trial periods</li>
              <li>Automatic proration if your customers upgrade or downgrade during a billing cycle</li>
              <li>Outreach to customers to resolve problems if their credit card payments fail</li>
              <li>Hosted pages for your customers to sign up and manage their credit card information</li>
              <li>Promo codes so your customers can apply discounts when they sign up.</li>
              <li>Metered billing -- for example, billing by the number of hours if you're a hosting provider.</li>
              <li>Tracking of "users" or licenses over long periods of time -- for example, tracking purchased software licenses or booked hotel rooms that are managed through your application</li>
            </ul>
          </div>
        </div>
        <div className="pricing-faqs-grid-6">
          <div className="pricing-block">
            <h3>What payments methods do we accept?</h3>
            <p>
              We accept Credit Card payments, but you can also take in credits and manually add checks that have been paid.
            </p>
            <br />
            <h3>What payment gateways do we support?</h3>
            <p>
              We currently support Stripe, Authorize.net, Braintree, Paypal (Payflow, Payments Pro), Wirecard, First Data, WePay, SagePay and more.
            </p>
            <br />
            <h3>How long after registering will it take to get up and running?</h3>
            <p>
              This will depend on how you would like implement rocketbiller. If you're looking to take advantage of our simple hosted payment forms, you can get up and running in minutes. If you're looking for a much deeper integration that requires your company to leverage our API, then it can take up to a week to implement.
            </p>
          </div>
        </div>
      </div>
		</div>
  )
}

export default PricingFAQs;
