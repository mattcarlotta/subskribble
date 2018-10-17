import React, { Component } from 'react';
import PageContainer from '../../panels/PageContainer/pageContainer';
import AvatarForm from '../../../../containers/forms/AvatarForm';
import AccountForm from '../../../../containers/forms/AccountForm';
import CurrentAvatar from '../CurrentAvatar/currentAvatar';
import DeleteAccount from '../DeleteAccount/deleteAccount';
import styles from './MyProfile.scss';

export default class Profile extends Component {
  state = { avatarFormVisible: false };

  hideAvatarForm = () => this.setState({ avatarFormVisible: false });

  showAvatarForm = () => this.setState({ avatarFormVisible: true });

  render = () => (
    <PageContainer>
      <div className={styles.settingsContainer}>
        <h2 style={{ color: '#03a9f3' }}>Settings</h2>
        <hr />
        <div className={styles.profilePicture}>
          <h4>Profile Picture</h4>
          <p className={styles.subdescription}>Update Your Profile Picture</p>
          <div className={styles.avatarBackgroundContainer}>
            <div className={styles.avatarForm}>
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
            <div className={styles.uploadAvatarInformation}>
              <p className={styles.information}>
                <span className={styles.bold}>Accepted file formats:</span>{' '}
                JPEG, PNG, GIF, and BMP (max resolution of 256x256, 10mb)
              </p>
            </div>
          </div>
        </div>
        <div className="clear-fix" />
        <div className="account-settings">
          <h4>Account Settings</h4>
          <p className={styles.subdescription}>Change Your Account Details</p>
          <AccountForm {...this.props} />
        </div>
        <div className="delete-account-settings">
          <h4>Deleting Your Subskribble Account</h4>
          <p className={styles.subdescription}>
            Completely Deactivate and Remove Your Account
          </p>
          <DeleteAccount />
        </div>
      </div>
    </PageContainer>
  );
}
