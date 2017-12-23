import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import { Scrollbars } from 'react-custom-scrollbars';

import Header from './header';
// import Footer from './footer';

export default WrappedComponent => {
	class DashboardWrapper extends Component {
		componentDidUpdate(prevProps) {
			if (this.props.location !== prevProps.location) this.refs.scrollbars.scrollTop(0);
		}

		render() {
			return (
				<Fragment>
					<Header />
					<Scrollbars
					ref="scrollbars"
					style={{ width: '100%', top: '70px' }}
					autoHeight
					autoHeightMin={`calc(100vh - 70px)`}
					autoHide
					autoHideTimeout={500}
					autoHideDuration={200}
					renderThumbVertical={props => <div {...props} className="scrollbar"/>}
					>
						<WrappedComponent {...this.props} />
					</Scrollbars>
					{/* <Footer /> */}
				</Fragment>
			);
		}
	}

	return withRouter(DashboardWrapper);
};
