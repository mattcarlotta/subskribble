import React, { Component } from 'react';
import PageContainer from '../panels/pageContainer';

export default class Profile extends Component {
  render = () => (
    <PageContainer>
      <div className="settings-container">
        <h2 className="title">Settings</h2>
        <hr/>
        <div className="profile-picture">
          <h4>Profile Picture</h4>
          <p>Update Your Profile Picture</p>
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
