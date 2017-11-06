import React from 'react';

import Header from '../components/navigation/header';

const Home = () => {
	return (
		<div>
			<Header />
			<div className="home-container">
				<h1>FRICTIONLESS BILLING</h1>
				<h3>Rocketbiller is the easiest way to create and manage recurring subscription payments.</h3>
			</div>
		</div>
	);
};

export default Home;
