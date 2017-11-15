import React from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

import metrics from '../images/metrics.png';
import InformationServices from '../components/home/services/informationServices';

const Home = () => {
	return (
		<span>
			<div className="background">
				<div className="filter">
					<div className="landing-container">
						<h1>FRICTIONLESS BILLING</h1>
						<div className="title">
							<span>Rocketbiller is the easiest way to create and manage recurring subscription payments.</span>
						</div>
						<div className="link">
							<Link to="/signup">
							<RaisedButton label="SignUp" className="btn sign-up-btn" />
						</Link>
					</div>
						<div className="img-container">
							<img src={metrics} alt="metrics.png" />
						</div>
					</div>
				</div>
			</div>
		<InformationServices />
		</span>
	);
};

export default Home;
