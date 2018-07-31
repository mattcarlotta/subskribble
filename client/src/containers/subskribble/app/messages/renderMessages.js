import React, { Component } from 'react';
import { connect } from 'react-redux';
import { notification } from 'antd';
import { resetServerMessages } from '../../../../actions/appActions';

notification.config({ placement: 'topRight', top: 50, duration: 7 });

const descriptionLayout = noteType => (
	<div className={`icon-message-container ${noteType}`}>
		<div className="icon">
			<i className="material-icons">{noteType === 'error' ? 'error' : 'check'}</i>
		</div>
	</div>
)
const serverErrorMessage = description => [{ noteType: 'error',  description }];
const serverSuccessMessage =  description => [{ noteType: 'success', description }];


class RenderMessages extends Component {
	componentDidUpdate = () => {
		const { serverError, serverMessage } = this.props;
		if (serverError || serverMessage) {
			const notification = serverError ? serverErrorMessage(serverError) : serverSuccessMessage(serverMessage);
			this.renderNotification(...notification);
		}
	}

	shouldComponentUpdate = nextProps => (
		this.props.serverError !== '' || nextProps.serverError !== '' || this.props.serverMessage !== '' || nextProps.serverMessage !== ''
	)

	renderNotification = ({ noteType, description }) => {
		notification[noteType]({
			message: noteType === 'error' ? 'Error' : 'Update',
			description,
			icon: descriptionLayout(noteType)
		});
		setTimeout(() => this.props.resetServerMessages(), 3000);
	}

	render = () => ( null )
}

export default connect(state => ({
	serverError: state.server.error,
	serverMessage: state.server.message
}), { resetServerMessages })(RenderMessages);
