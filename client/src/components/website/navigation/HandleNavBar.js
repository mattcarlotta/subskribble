import throttle from 'lodash/throttle';
import React, { Component } from 'react';

import Header from './header';

export default class HandleNavBar extends Component {
	constructor(props) {
		super(props);
		this.state = { scrollY: window.scrollY, fixedNavBar: false };
		this.handleScroll = throttle(this.handleWindowScroll, 100);
	}

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	handleWindowScroll = () => {
		this.setState({ scrollY: window.scrollY, fixedNavBar: window.scrollY >= 30 ? true : false });
	};

	render() { return <Header fixedNavBar={this.state.fixedNavBar} /> }
}
