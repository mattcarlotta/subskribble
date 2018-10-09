import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button, Col, Tooltip } from 'antd';

const CurrentAvatar = ({ avatarURL, deleteAvatar, showAvatarForm }) => (
  <div className="current-avatar-container">
    <div className="avatar-container">
      <div className="avatar-preview-container">
        <div className="avatar-preview">
          <Avatar
            className="avatar-icon"
            src={avatarURL}
            icon="user"
            style={{
              backgroundColor: !avatarURL ? '#1890ff' : null,
              height: 115,
              width: 115,
            }}
          />
        </div>
      </div>
    </div>
    <div className="avatar-actions-container">
      <Tooltip arrowPointAtCenter placement="bottom" title="Delete Avatar">
        <Col span={12}>
          <Button
            className={!avatarURL ? 'btn-disabled' : 'btn-danger'}
            shape="circle"
            icon="delete"
            disabled={!avatarURL || false}
            onClick={deleteAvatar}
          />
        </Col>
      </Tooltip>
      <Tooltip arrowPointAtCenter placement="bottom" title="Change Avatar">
        <Col span={12}>
          <Button
            type="primary"
            shape="circle"
            icon="retweet"
            onClick={showAvatarForm}
          />
        </Col>
      </Tooltip>
    </div>
  </div>
);

export default CurrentAvatar;

CurrentAvatar.propTypes = {
  avatarURL: PropTypes.string,
  deleteAvatar: PropTypes.func.isRequired,
  showAvatarForm: PropTypes.func.isRequired,
};