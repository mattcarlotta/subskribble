import React, { Component } from 'react';
import { withRouter } from 'react-router';

// import NavButtons from './NavButtons';
import Header from './header';
// import Footer from './footer'

export default WrappedComponent => {
	class WindowScroll extends Component {
		componentDidUpdate(prevProps) {
			if (this.props.location !== prevProps.location)
				this.component.scrollIntoView();
		}

		render() {
			return (
				<span ref={component => (this.component = component)}>
					<div className="wrapper">
						<Header />
						<WrappedComponent {...this.props} />
						{/* <Footer /> */}
					</div>
				</span>
			);
		}
	}

	return withRouter(WindowScroll);
};
