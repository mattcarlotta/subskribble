import React, { Component } from 'react';
import PageContainer from '../../panels/pageContainer';
import AvatarForm from '../../../../containers/forms/AvatarForm';
import AccountForm from '../../../../containers/forms/AccountForm';
import CurrentAvatar from '../CurrentAvatar/currentAvatar';
import DeleteAccount from '../DeleteAccount/deleteAccount';

export default class Profile extends Component {
  state = { avatarFormVisible: false };

  hideAvatarForm = () => this.setState({ avatarFormVisible: false });

  showAvatarForm = () => this.setState({ avatarFormVisible: true });

  render = () => (
    <PageContainer>
      <div className="settings-container">
        <h2>Settings</h2>
        <hr />
        <div className="profile-picture">
          <h4>Profile Picture</h4>
          <p className="subdescription">Update Your Profile Picture</p>
          <div className="avatar-background-container">
            <div className="avatar-form">
              {!this.state.avatarFormVisible ? (
                <CurrentAvatar
                  {...this.props}
                  showAvatarForm={this.showAvatarForm}
                />
              ) : (
                <AvatarForm
                  {...this.props}
                  hideAvatarForm={this.hideAvatarForm}
                />
              )}
            </div>
            <div className="upload-avatar-information">
              <p className="information">
                <span className="bold">Accepted file formats:</span> JPEG, PNG,
                GIF, and BMP (max resolution of 256x256, 10mb)
              </p>
            </div>
          </div>
        </div>
        <div className="clear-fix" />
        <div className="account-settings">
          <h4>Account Settings</h4>
          <p className="subdescription">Change Your Account Details</p>
          <AccountForm {...this.props} />
        </div>
        <div className="delete-account-settings">
          <h4>Deleting Your Subskribble Account</h4>
          <p className="subdescription">
            Completely Deactivate and Remove Your Account
          </p>
          <DeleteAccount />
        </div>
      </div>
    </PageContainer>
  );
}
