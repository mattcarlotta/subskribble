import React from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

import metrics from '../images/metrics.png';

const Home = () => {
	return (
		<div className="home-surround">
			<div className="home-overlay">
				<div className="home-container">
					<h1>FRICTIONLESS BILLING</h1>
					<h3>Rocketbiller is the easiest way to create and manage recurring subscription payments.</h3>
					<Link to="/signup">
						<RaisedButton label="SignUp" className="btn-sign-up" />
					</Link>
					<div className="img-container">
						<img src={metrics} alt="metrics.png" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
