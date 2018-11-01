import React from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip } from 'antd';
import { browserHistory } from 'react-router';
import { adjustPosition, materialIcons } from '../../../../styles';

const CustomButton = ({
  buttonIcon,
  buttonPushLocation,
  className,
  onClickAction,
  style,
  tipTitle,
}) => {
  const pushToLocation = () =>
    browserHistory.push(`/subskribble/${buttonPushLocation}`);
  return (
    <Tooltip
      arrowPointAtCenter
      placement="bottom"
      trigger="hover"
      title={tipTitle}
    >
      <Button
        className={`btn-primary ${className}`}
        onClick={onClickAction || pushToLocation}
        style={style}
      >
        <i className={`${materialIcons} ${adjustPosition}`}>{buttonIcon}</i>
      </Button>
    </Tooltip>
  );
};

export default CustomButton;

CustomButton.propTypes = {
  buttonIcon: PropTypes.string,
  buttonPushLocation: PropTypes.string,
  className: PropTypes.string,
  onClickAction: PropTypes.func,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  tipTitle: PropTypes.string,
};
