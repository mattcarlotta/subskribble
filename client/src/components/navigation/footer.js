import { map } from 'lodash';
import React from 'react';

import LINKS from './links/footerLinks';

const Footer = () => {
	return (
		<div className="footer-head">
			<div className="footer-container">
				<div className="footer-grid-4">
					<p>©2017 RocketBiller, LLC</p>
				</div>
				<nav className="footer-grid-8">
					<div className="footer-float-right">
						{
							map(LINKS, ({ link, icon, title}, key) => {
								return (
									<a key={key} href={link}>
										<i className={`fa fa-${icon}`} aria-hidden="true" />
										{title}
									</a>
								);
							})
						}
					</div>
				</nav>
			</div>
		</div>
	);
};

export default Footer;
