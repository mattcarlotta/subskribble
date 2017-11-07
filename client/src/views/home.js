import React from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

import metrics from '../images/metrics.png';

const Home = () => {
	return (
		<div className="home-container">
			<h1>FRICTIONLESS BILLING</h1>
			<div className="title">
				<span>Rocketbiller is the easiest way to create and manage recurring subscription payments.</span>
			</div>
			<div className="link">
				<Link to="/signup">
				<RaisedButton label="SignUp" className="btn-sign-up" />
			</Link>
			</div>
			<div className="img-container">
				<img src={metrics} alt="metrics.png" />
			</div>
		</div>
	);
};

export default Home;
