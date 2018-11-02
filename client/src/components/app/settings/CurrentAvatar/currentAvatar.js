import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button, Col, Tooltip } from 'antd';
import styles from './currentAvatar.scss';

const CurrentAvatar = ({ avatarURL, deleteAvatar, showAvatarForm }) => (
  <Fragment>
    <div className={styles.avatarContainer}>
      <div className={styles.avatarPreviewContainer}>
        <div className={styles.avatarPreview}>
          <Avatar
            src={avatarURL}
            icon="user"
            style={{
              backgroundColor: !avatarURL ? '#1890ff' : null,
              height: 115,
              width: 115,
            }}
            className="avatar-svg-container"
          />
        </div>
      </div>
    </div>
    <div className={styles.avatarActionsContainer}>
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
  </Fragment>
);

export default CurrentAvatar;

CurrentAvatar.propTypes = {
  avatarURL: PropTypes.string,
  deleteAvatar: PropTypes.func.isRequired,
  showAvatarForm: PropTypes.func.isRequired,
};
