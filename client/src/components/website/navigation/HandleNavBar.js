import throttle from 'lodash/throttle';
import React, { Component } from 'react';
import { withRouter } from 'react-router';

import Header from './header';

class HandleNavBar extends Component {
	constructor(props) {
		super(props);
		this.state = { scrollY: window.scrollY, fixedNavBar: false, blueNav: '' };
		this.handleScroll = throttle(this.handleWindowScroll, 100);
	}

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
		const { pathname } = this.props.location;
		const blueNav = (pathname.indexOf('customer-signup') > 0) ? 'adjust-bg' : ''
		this.setState({ blueNav })
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	handleWindowScroll = () => {
		this.setState({ scrollY: window.scrollY, fixedNavBar: window.scrollY >= 30 ? true : false });
	};

	render() { return <Header fixedNavBar={this.state.fixedNavBar} blueNav={this.state.blueNav} /> }
}

export default withRouter(HandleNavBar)
