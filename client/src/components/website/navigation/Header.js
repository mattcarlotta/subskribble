import throttle from 'lodash/throttle';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router';

import CustomDropDown from '../app/popovers/customDropDown';
import { INDUSTRYTABS, TOURTABS } from './links/headerTabs';
import rocketLogoWhite from '../../../images/logos/rocketbiller_logo_white.png';
import rocketLogoBlack from '../../../images/logos/rocketbiller_logo_black.png';

class Header extends Component {
	state = { adjustNavBG: '', fixedNavBar: false }

	componentWillMount = () => this.checkIfFormLoaded(this.props.location.pathname);

	componentWillUpdate = nextProps => this.checkIfFormLoaded(nextProps.location.pathname);

	componentDidMount = () => window.addEventListener('scroll', this.handleWindowScroll);

	componentWillUnmount = () => window.removeEventListener('scroll', this.handleWindowScroll);

	handleWindowScroll = throttle(() => this.setState({ fixedNavBar: window.scrollY >= 30 ? true : false }), 100);

	checkIfFormLoaded = url => {
		const { adjustNavBG } = this.state;
		const setNavBGToBlue = url.indexOf('customer-signup') > 0;

		if (!adjustNavBG && setNavBGToBlue) this.setState({ adjustNavBG : 'adjust-bg' });
		else if (adjustNavBG && !setNavBGToBlue) this.setState({ adjustNavBG: '' });
	}

	render() {
		const { adjustNavBG, fixedNavBar } = this.state;
		const rbLogo = fixedNavBar ? rocketLogoBlack : rocketLogoWhite;

		return (
			<div className={fixedNavBar ? 'nav-header fixed' : `nav-header ${adjustNavBG}`}>
				<div className="nav-container">
					<div className="nav-grid-3">
						<Link to="/">
							<img className="nav-logo" src={rbLogo} alt="rocketBillerLogo.png" />
						</Link>
					</div>
					<nav className="nav-grid-9">
						<div className="nav-float-right">
							<Link to="/">Home</Link>
							<CustomDropDown
								dropDownLabel="Industries"
								TABS={INDUSTRYTABS}
							/>
							<Link to="/pricing">Pricing</Link>
							<CustomDropDown
								dropDownLabel="Tour"
								TABS={TOURTABS}
							/>
						</div>
					</nav>
				</div>
			</div>
		);
	}
};

export default withRouter(Header);
