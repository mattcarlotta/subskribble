import React from 'react';
import { Link } from 'react-router';

import RaisedButton from 'material-ui/RaisedButton';

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
    					<div className="link">
    						<Link to="/pricing">
                  <RaisedButton
                    label="Pricing Plans"
                    backgroundColor={'#e04d2d'}
                    buttonStyle={{ border: '2px solid transparent', borderRadius: 5 }}
                    labelStyle={{ color: '#eee', fontSize: 18, fontFamily: "'Raleway Regular', Verdana, Helvetica, Arial, sans-serif", letterSpacing: 1 }}
                    style={{ height: 50, width: 215, marginTop: 15, borderRadius: 6 }}
                  />
    					  </Link>
    				  </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InformationPricing;
