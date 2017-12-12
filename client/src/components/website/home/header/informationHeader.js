import React from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

import metrics from '../../../../images/metrics.png';

const InformationHeader = () => {
  return (
		<div className="header-background">
			<div className="header-filter">
				<div className="header-container">
					<h1>Frictionless Billing</h1>
					<div className="title">
						Rocketbiller is the easiest way to create and manage recurring subscription payments.
					</div>
					<Link to="/signup">
					  <RaisedButton
              label="SignUp"
              backgroundColor={'#e04d2d'}
              buttonStyle={{ border: '2px solid transparent', borderRadius: 5 }}
              labelStyle={{ color: '#eee', fontSize: 18, fontFamily: "'Raleway Regular', Verdana, Helvetica, Arial, sans-serif", letterSpacing: 1 }}
              style={{ height: 50, width: 215, marginTop: 15, borderRadius: 6 }}
            />
				  </Link>
					<div className="img-container">
						<img src={metrics} alt="metrics.png" />
					</div>
				</div>
			</div>
		</div>
  )
}

export default InformationHeader;
