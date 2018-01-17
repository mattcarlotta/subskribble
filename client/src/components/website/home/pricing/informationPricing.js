import React from 'react';

import Button from '../../app/buttons/customButton';

const InformationPricing = () => {
  return (
    <div className="pricing-bg">
      <div className="pricing-container">
        <div className="pricing-grid-12">
          <div className="pricing-block">
            <div className="title-container">
              <h2 className="title">
                Choose a plan that fits your business
              </h2>
              <Button
                btnClassName="btn-danger"
                border="none"
                fontSize={17}
                height={50}
                label="Pricing"
                link="/pricing"
                width={215}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InformationPricing;
