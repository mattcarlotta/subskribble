import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { Button, Tooltip } from 'antd';

export default class NavButton extends PureComponent {
  handleClick = () => browserHistory.push(`/subskribble/${this.props.link}`);

  handlePreventButtonFocus = e => e.target.blur();

  render = () => (
    <Tooltip
      arrowPointAtCenter
      placement="bottom"
      title={this.props.tooltip}
      overlayClassName="tooltip-placement"
    >
      <Button
        className={`nav-button ${this.props.className}`}
        onClick={
          this.props.onClickAction ? this.props.onClickAction : this.handleClick
        }
        onFocus={this.handlePreventButtonFocus}
      >
        <i className="material-icons nav-button-icon">{this.props.icon}</i>
      </Button>
    </Tooltip>
  );
}

NavButton.propTypes = {
  icon: PropTypes.string,
  link: PropTypes.string,
  tooltip: PropTypes.string,
  className: PropTypes.string,
  onClickAction: PropTypes.func,
};
