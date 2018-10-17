import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'antd';
import CustomButton from '../../../app/buttons/CustomButton/customButton';
import styles from './miniPanel.scss';

const MiniPanel = ({
  buttonIcon,
  buttonPushLocation,
  buttonTipTitle,
  children,
  title,
  titleColor,
  titleIcon,
}) => (
  <Col span={8}>
    <div className={styles.miniPanelContainer}>
      <div className={styles.dashTabContainer}>
        <h5 style={{ color: titleColor }} className={styles.dashTab}>
          <i className={styles.materialIcons}>{titleIcon}</i>
          <span>{title}</span>
        </h5>
        {buttonIcon && buttonPushLocation && buttonTipTitle ? (
          <CustomButton
            buttonIcon={buttonIcon}
            style={{ float: 'right' }}
            buttonPushLocation={buttonPushLocation}
            tipTitle={buttonTipTitle}
          />
        ) : null}
      </div>
      <hr />
      <div className={styles.dashDetailsContainer}>{children}</div>
    </div>
  </Col>
);

export default MiniPanel;

MiniPanel.propTypes = {
  buttonIcon: PropTypes.string,
  buttonPushLocation: PropTypes.string,
  buttonTipTitle: PropTypes.string,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  titleColor: PropTypes.string.isRequired,
  titleIcon: PropTypes.string.isRequired,
};
