import React, { Component } from 'react';
import { Link } from 'react-router';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import rocketLogoText from '../../images/logos/rocketbiller_logo_white.png';

// import NAVSCROLLITEMS from './data/navScrollToIndexData';
// import NavScrollTo from './navScrollTo';
// import SignOut from '../../containers/auth/signout';

class Header extends Component {
	state= {
		industryTabOpen: false,
		tourTabOpen: false
	}

	handleTouchTap = (e, industryTabOpen, tourTabOpen) => {
    e.preventDefault();

    this.setState({
			industryTabOpen: industryTabOpen,
			tourTabOpen: tourTabOpen,
      anchorEl: e.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      industryTabOpen: false,
			tourTabOpen: false
    });
  };

	render() {
		return (
			<div className="nav-overlay">
				<div className='nav-header'>
					<div className="nav-container">
						<div className="nav-grid-3">
							<Link to="/"><img className="nav-logo" src={rocketLogoText} alt="rocketLogoText.png" /></Link>
						</div>
						<nav className="nav-grid-9">
							<div className="nav-float-right">
								<Link to="/">Home</Link>
								<Link onClick={(e) => this.handleTouchTap(e, true, false)}>
									Industries
									<span><i className="fa fa-chevron-down s-i" aria-hidden="true" /></span>
								</Link>
								 <Popover
				          open={this.state.industryTabOpen}
				          anchorEl={this.state.anchorEl}
				          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
				          targetOrigin={{horizontal: 'left', vertical: 'top'}}
				          onRequestClose={this.handleRequestClose}
				        >
				          <Menu>
										<MenuItem primaryText="Education" />
				            <MenuItem primaryText="Fitness" />
										<MenuItem primaryText="Healthcare" />
										<MenuItem primaryText="Marketing Agencies" />
										<MenuItem primaryText="MSPs" />
										<MenuItem primaryText="Non-Profit" />
										<MenuItem primaryText="Self-Storage" />
										<MenuItem primaryText="Service Providers" />
										<MenuItem primaryText="Software as a service" />
										<MenuItem primaryText="Web Designers" />
				          </Menu>
				        </Popover>
								<Link to="/pricing">Pricing</Link>
								<Link onClick={(e) => this.handleTouchTap(e, false, true)}>
									Tour
									<span><i className="fa fa-chevron-down s-i" aria-hidden="true" /></span>
								</Link>
									<Popover
									 open={this.state.tourTabOpen}
									 anchorEl={this.state.anchorEl}
									 anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
									 targetOrigin={{horizontal: 'left', vertical: 'top'}}
									 onRequestClose={this.handleRequestClose}
								 >
									 <Menu>
										 <MenuItem primaryText="Contact" />
										 <MenuItem primaryText="Privacy Policy" />
										 <MenuItem primaryText="Terms of Service" />
									 </Menu>
								 </Popover>
							</div>
						</nav>
					</div>
				</div>
			</div>
		);
	}
};

export default Header;

/*
<div className={fixedNavBar ? 'fixed-nav' : null}>
	<nav className="navigation-container">
		<ul className="navigation-bar">
			{map(NAVSCROLLITEMS, ({ pixel, icon, title }, key) => {
				return (
					<NavScrollTo key={key} pixel={pixel} icon={icon} title={title} />
				);
			})}
			<li>
				<Link
					onClick={() =>
						browserHistory.push({
							pathname: `/blog/page`,
							query: { pageId: 1 }
						})}
				>
					<i className="fa fa-commenting-o" aria-hidden="true" />
					{window.innerWidth < 650 ? '' : 'Blog'}
				</Link>
			</li>
			<li>
				<Link onClick={() => Nav.scrollToBottom()}>
					<i className="fa fa-envelope-o" aria-hidden="true" />
					{window.innerWidth < 650 ? '' : 'Contact'}
				</Link>
			</li>
			<SignOut />
		</ul>
	</nav>
</div>
*/
