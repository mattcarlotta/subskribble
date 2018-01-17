import React from 'react';
import Button from '../../app/buttons/customButton';

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
          <Button
            btnClassName="btn-danger"
            border="none"
            fontSize={18}
            height={50}
            label="Signup"
            link="/signup"
            width={215}
          />
					<div className="img-container">
						<img src={metrics} alt="metrics.png" />
					</div>
				</div>
			</div>
		</div>
  )
}

export default InformationHeader;
