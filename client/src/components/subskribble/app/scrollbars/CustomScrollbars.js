import React, { PureComponent } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

export default class CustomScrollbars extends PureComponent {
	componentDidUpdate = (prevProps, prevState) => this.props.location !== prevProps.location && this.refs.scrollbars.scrollTop(0);

	render = () => (
		<Scrollbars
			ref="scrollbars"
			style={{ width: '100%', top: this.props.top }}
			autoHeight
			autoHeightMin={this.props.minHeight}
			autoHide
			autoHideTimeout={500}
			autoHideDuration={200}
			renderThumbVertical={props => <div {...props} className="scrollbar"/>}
			>
				{this.props.children}
		</Scrollbars>
	)
}
