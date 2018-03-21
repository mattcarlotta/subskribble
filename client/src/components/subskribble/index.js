import React, { PureComponent, Fragment } from 'react';
import { withRouter } from 'react-router';
import { Scrollbars } from 'react-custom-scrollbars';
import RenderMessages from '../../containers/subskribble/app/messages/renderMessages';

class App extends PureComponent {
	componentDidUpdate = prevProps => this.props.location !== prevProps.location && this.refs.scrollbars.scrollTop(0);

	render = () => (
		<Fragment>
			<Scrollbars
				ref="scrollbars"
				style={{ width: '100%', top: '55px' }}
				autoHeight
				autoHeightMin={`calc(100vh - 55px)`}
				autoHide
				autoHideTimeout={500}
				autoHideDuration={200}
				renderThumbVertical={props => <div {...props} className="scrollbar"/>}
				>
					{ this.props.children }
			</Scrollbars>
			<RenderMessages />
		</Fragment>
	)
}

export default withRouter(App);
