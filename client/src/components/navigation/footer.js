import React from 'react';

const Footer = () => {
	return (
		<div className="footer-head">
			<div className="footer-container">
				<div className="footer-grid-4">
					<p>©2017 RocketBiller, LLC</p>
				</div>
				<nav className="footer-grid-8">
					<div className="footer-float-right">
						<a href="http://www.facebook.com/rocketbiller">
							<i className="fa fa-facebook" aria-hidden="true" />
							Facebook
						</a>
						<a href="https://twitter.com/rocketbiller">
							<i className="fa fa-twitter" aria-hidden="true" />
							Twitter
						</a>
						<a href="https://plus.google.com/">
							<i className="fa fa-google-plus" aria-hidden="true" />
							Google+
						</a>
						<a href="http://www.linkedin.com/in/rocketbiller">
							<i className="fa fa-linkedin" aria-hidden="true" />
							Linkedin
						</a>
					</div>
				</nav>
			</div>
		</div>
	);
};

export default Footer;
