import throttle from 'lodash/throttle';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router';

import CustomPopover from '../app/popovers/customPopover';
import { INDUSTRYTABS, TOURTABS } from './links/headerTabs';
import rocketLogoWhite from '../../../images/logos/rocketbiller_logo_white.png';
import rocketLogoBlack from '../../../images/logos/rocketbiller_logo_black.png';

class Header extends Component {
	state = { fixedNavBar: false, industryTabOpen: false, tourTabOpen: false }

	componentWillMount = () => this.checkIfFormLoaded(this.props.location.pathname);

	componentWillUpdate = nextProps => this.checkIfFormLoaded(nextProps.location.pathname);

	componentDidMount = () => window.addEventListener('scroll', this.handleWindowScroll);

	componentWillUnmount = () => window.removeEventListener('scroll', this.handleWindowScroll);

	handleWindowScroll = throttle(() => this.setState({ fixedNavBar: window.scrollY >= 30 ? true : false }), 100);

	checkIfFormLoaded = url => {
		const { adjustNavBG } = this.state;
		const setNavBGToBlue = url.indexOf('customer-signup') > 0;

		if (!adjustNavBG && setNavBGToBlue) this.setState({ adjustNavBG : 'adjust-bg' });
		else if (adjustNavBG && !setNavBGToBlue) this.setState({ adjustNavBG: null });
	}

	handleTouchTap = (e, tabKey) => {
    e.preventDefault();

    this.setState({
			industryTabOpen: tabKey === 'Industry' ? true : false,
			tourTabOpen: tabKey === 'Tour' ? true : false,
      anchorEl: e.currentTarget
    });
  };

  handleRequestClose = () => this.setState({ industryTabOpen: false, tourTabOpen: false })

	handleTabIcon = (tab) => {
		const direction = tab ? 'up' : 'down';
		return <span><i className={`fa fa-chevron-${direction} s-i`} aria-hidden="true" /></span>
	}

	render() {
		const { adjustNavBG, anchorEl, fixedNavBar, industryTabOpen, tourTabOpen } = this.state;
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
							<CustomPopover
								anchorEl={anchorEl}
								handleTabIcon={this.handleTabIcon}
								handleTouchTap={this.handleTouchTap}
								linkLabel="Industries"
								handleRequestClose={this.handleRequestClose}
								tabKey="Industry"
								tabOpen={industryTabOpen}
								TABS={INDUSTRYTABS}
							/>
							<Link to="/pricing">Pricing</Link>
							<CustomPopover
								anchorEl={anchorEl}
								handleTabIcon={this.handleTabIcon}
								handleTouchTap={this.handleTouchTap}
								linkLabel="Tour"
								linkTabs={true}
								handleRequestClose={this.handleRequestClose}
								tabKey="Tour"
								tabOpen={tourTabOpen}
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
