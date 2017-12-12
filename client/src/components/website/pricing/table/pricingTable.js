import map from 'lodash/map';
import React from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

import PRICINGFIELDS from './pricingTableFields';

const PricingTable = () => {
  return (
		<div className="pricing-table-bg">
			<div className="pricing-table-container">
				<div className="pricing-table">
          {
            map(PRICINGFIELDS, ({ title, price, decimal, duration, customers, maxForms, forms, support, analyticsType, analytics, recommended, buttonLabel, buttonLink }) => {
              return (
                  <div key={title} className="table-col-25">
                    <div className={ recommended ? "table-header-recommended" : "table-header" }>{title}</div>
                    <div className={ recommended ? "table-top-recommended" : "table-top" }>
                      <span className="price">{price}</span>
                      <span className="decimal">{decimal}</span>
                      <span className="plan-length"><strong>{duration}</strong></span>
                    </div>
                    <div className="table-content">
                      <span className="item"><strong>{title}</strong> Bundle</span>
                      <span className="item"><strong>{customers}</strong> Customers</span>
                      <span className="item"><strong>{maxForms}</strong> {forms}</span>
                      <span className="item"><strong>{support}</strong> Support</span>
                      <span className="item"><strong>{analyticsType}</strong> {analytics}</span>
                    </div>
                    <div className="table-bottom">
                    <Link to={buttonLink}>
                      <RaisedButton
                        label={buttonLabel}
                        backgroundColor={'#e04d2d'}
                        buttonStyle={{ border: '2px solid transparent', borderRadius: 5 }}
                        labelStyle={{ color: '#fbe2dd', fontSize: 15, fontFamily: "'Raleway Regular', Verdana, Helvetica, Arial, sans-serif", letterSpacing: 1 }}
                        style={{ height: 50, width: 200, marginTop: 15, borderRadius: 6 }}
                      />
                    </Link>
                  </div>
                </div>
              )
            })
          }
        </div>
			</div>
		</div>
  )
}

export default PricingTable;
