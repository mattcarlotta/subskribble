import throttle from 'lodash/throttle';
import React, { Component } from 'react';

import Header from './header';

export default class HandleNavBar extends Component {
	state = { scrollY: window.scrollY, fixedNavBar: false };

	componentDidMount() {
		window.addEventListener('scroll', this.handleWindowScroll);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleWindowScroll);
	}

	handleWindowScroll = throttle(() => {
		this.setState({ scrollY: window.scrollY, fixedNavBar: window.scrollY >= 30 ? true : false });
	}, 100);

	render() {
		return <Header fixedNavBar={this.state.fixedNavBar} />
	}
}
