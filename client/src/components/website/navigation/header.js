import map from 'lodash/map';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

import { INDUSTRYTABS, TOURTABS } from './links/headerTabs';
import rocketLogoWhite from '../../../images/logos/rocketbiller_logo_white.png';
import rocketLogoBlack from '../../../images/logos/rocketbiller_logo_black.png';

class Header extends Component {
	state = { industryTabOpen: false, tourTabOpen: false }

	handleTouchTap = (e, industryTabOpen, tourTabOpen) => {
    e.preventDefault();

    this.setState({
			adjustNavbg: '',
			isLoaded: false,
			industryTabOpen: industryTabOpen,
			tourTabOpen: tourTabOpen,
      anchorEl: e.currentTarget
    });
  };

	componentDidMount = () => {
		const { adjustBG } = this.state;
		const pathname = this.props.location.pathname.indexOf('customer-signup') > 0;

		if (!adjustBG && pathname) this.setState({ adjustBG : 'adjust-bg' })
	}

	componentWillUpdate = (nextProps) => {
		const { adjustBG } = this.state;
		const nextPathname = nextProps.location.pathname.indexOf('customer-signup') >= 1;

		if (!adjustBG && nextPathname) this.setState({ adjustBG : 'adjust-bg' })
		else if (adjustBG && !nextPathname) this.setState({ adjustBG: '' })
	}

  handleRequestClose = () => this.setState({ industryTabOpen: false, tourTabOpen: false })

	handleTabIcon = (tab) => {
		return (
			tab
				? <span><i className="fa fa-chevron-up s-i" aria-hidden="true" /></span>
				: <span><i className="fa fa-chevron-down s-i" aria-hidden="true" /></span>
		);
	}

	handleNestedTabs = (nestedTabs) => {
		return map(nestedTabs, (tab) => {
			return <MenuItem primaryText={tab} />
		});
	}

	render() {
		const { adjustBG, anchorEl, industryTabOpen, tourTabOpen } = this.state;
		const { fixedNavBar } = this.props;
		const rbLogo = fixedNavBar ? rocketLogoBlack : rocketLogoWhite;

		return (
			<div className={fixedNavBar ? 'nav-header fixed' : `nav-header ${adjustBG}`}>
				<div className="nav-container">
					<div className="nav-grid-3">
						<Link to="/"><img className="nav-logo" src={rbLogo} alt="rocketBillerLogo.png" /></Link>
					</div>
					<nav className="nav-grid-9">
						<div className="nav-float-right">
							<Link to="/">Home</Link>
							<Link onClick={e => this.handleTouchTap(e, true, false)}>
								Industries
								{ this.handleTabIcon(industryTabOpen) }
							</Link>
							<Popover
								open={industryTabOpen}
								anchorEl={anchorEl}
								anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
								targetOrigin={{horizontal: 'left', vertical: 'top'}}
								onRequestClose={this.handleRequestClose}
								>
								<Menu>
									{
										map(INDUSTRYTABS, ({tab, nestedTabs}) => {
											return (
												<MenuItem
													key={tab}
													primaryText={tab}
													rightIcon={ (nestedTabs) ? <ArrowDropRight /> : null}
													menuItems={ (nestedTabs) ? this.handleNestedTabs(nestedTabs) : null }
												/>
											)
										})
									}
								</Menu>
							</Popover>
							<Link to="/pricing">Pricing</Link>
							<Link onClick={e => this.handleTouchTap(e, false, true)}>
								Tour
								{ this.handleTabIcon(tourTabOpen) }
							</Link>
							<Popover
								open={tourTabOpen}
								anchorEl={anchorEl}
								anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
								targetOrigin={{horizontal: 'left', vertical: 'top'}}
								onRequestClose={this.handleRequestClose}
								>
								<Menu>
									{
										map(TOURTABS, ({ link, label }) => {
											return (
												<Link key={label} onClick={this.handleRequestClose} to={link}>
													<MenuItem primaryText={label} />
												</Link>
											);
										})
									}
								</Menu>
							</Popover>
						</div>
					</nav>
				</div>
			</div>
		);
	}
};

export default withRouter(Header);
