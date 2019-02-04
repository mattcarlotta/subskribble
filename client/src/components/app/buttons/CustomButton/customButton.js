import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip } from 'antd';
import { browserHistory } from 'react-router';
import { adjustPosition, materialIcons } from '../../../../styles/styles.scss';

class CustomButton extends PureComponent {
  pushToLocation = () =>
    browserHistory.push(`/subskribble/${this.props.buttonPushLocation}`);

  render = () => (
    <Tooltip
      arrowPointAtCenter
      placement="bottom"
      trigger="hover"
      title={this.props.tipTitle}
    >
      <Button
        data-test="component-customButton"
        className={`btn-primary ${this.props.className}`}
        onClick={this.props.onClickAction || this.pushToLocation}
        style={this.props.style}
      >
        <i className={`${materialIcons} ${adjustPosition}`}>
          {this.props.buttonIcon}
        </i>
      </Button>
    </Tooltip>
  );
}

export default CustomButton;

CustomButton.propTypes = {
  buttonIcon: PropTypes.string,
  buttonPushLocation: PropTypes.string,
  className: PropTypes.string,
  onClickAction: PropTypes.func,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  tipTitle: PropTypes.string,
};
