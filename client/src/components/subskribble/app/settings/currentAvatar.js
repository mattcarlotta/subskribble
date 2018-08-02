import React from 'react';
import { Avatar, Button } from 'antd';

export default ({ avatarURL, showAvatarForm }) => (
  <div className="current-avatar-container">
    <div className="avatar-container">
      <div className="avatar-preview-container">
        <div className="avatar-preview">
          <Avatar
            className="avatar-icon"
            src={avatarURL}
            icon="user"
            style={{ backgroundColor: !avatarURL ? "#1890ff" : null, height: 115, width: 115 }}
          />
        </div>
      </div>
    </div>
    <Button
      type="primary"
      style={{ width: 128 }}
      onClick={showAvatarForm}
      >
        Change
    </Button>
  </div>
)
