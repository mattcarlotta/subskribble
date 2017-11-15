import { map } from 'lodash'
import React, { Component } from 'react';
import { Link } from 'react-router';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

import { INDUSTRYTABS, TOURTABS } from './links/headerTabs';
import rocketLogoText from '../../images/logos/rocketbiller_logo_white.png';

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
      anchorEl: e.currentTarget
    });
  };

  handleRequestClose = () => {
    this.setState({
      industryTabOpen: false,
			tourTabOpen: false
    });
  };

	handleTabIcon = (tab) => {
		return (
			tab
				? <span><i className="fa fa-chevron-up s-i" aria-hidden="true" /></span>
				: <span><i className="fa fa-chevron-down s-i" aria-hidden="true" /></span>
		);
	}

	handleNestedTabs = (nestedTabs) => {
		return map(nestedTabs, (tab) => {
			return (
				<MenuItem primaryText={tab} />
			)
		})
	}

	render() {
		const { industryTabOpen, tourTabOpen } = this.state;

		return (
			<div className='nav-header'>
				<div className="nav-container">
					<div className="nav-grid-3">
						<Link to="/"><img className="nav-logo" src={rocketLogoText} alt="rocketLogoText.png" /></Link>
					</div>
					<nav className="nav-grid-9">
						<div className="nav-float-right">
							<Link to="/">Home</Link>
							<Link onClick={e => this.handleTouchTap(e, true, false)}>
								Industries
								{ this.handleTabIcon(industryTabOpen) }
							</Link>
							<Popover
								open={this.state.industryTabOpen}
								anchorEl={this.state.anchorEl}
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
									open={this.state.tourTabOpen}
									anchorEl={this.state.anchorEl}
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
