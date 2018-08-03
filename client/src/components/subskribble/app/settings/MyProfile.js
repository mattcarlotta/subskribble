import React, { Component } from 'react';
import PageContainer from '../panels/pageContainer';
import UploadForm from '../../../../containers/subskribble/forms/UploadForm';
import CurrentAvatar from './currentAvatar';

export default class Profile extends Component {
	state = { avatarFormVisible: false }

	hideAvatarForm = () => this.setState({ avatarFormVisible: false })
	showAvatarForm = () => this.setState({ avatarFormVisible: true })

	render = () => (
		<PageContainer>
			<div className="settings-container">
				<h2 className="title">Settings</h2>
				<hr/>
				<div className="profile-picture">
					<h4>Profile Picture</h4>
					<p>Update Your Profile Picture</p>
					{ !this.state.avatarFormVisible
						? <CurrentAvatar { ...this.props } showAvatarForm={this.showAvatarForm} />
						: <UploadForm { ...this.props } hideAvatarForm={this.hideAvatarForm} />
					}
				</div>
				<div className="profile-settings">
					<h4>Profile Settings</h4>
					<p>Change Your Account Details</p>
				</div>
				<div className="delete-account">
					<h4>Deleting Your Subskribble Account</h4>
					<p>Completely Deactivate and Remove Your Account</p>
				</div>
			</div>
		</PageContainer>
	)
}
