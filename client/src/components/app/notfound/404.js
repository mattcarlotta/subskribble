import React, { Component } from 'react';
import { browserHistory } from 'react-router';

export default class NotFoundPage extends Component {
	handleGoBack = () => {
		browserHistory.goBack();
	}

	render() {
		return (
			<div className="notfound-container">
				<h1>404 - Not Found!</h1>
				<button onClick={this.handleGoBack}>
					Go Back
				</button>
			</div>
		);
	}
};
