import React, { PureComponent } from 'react';
import { browserHistory } from 'react-router';
import { Button, Tooltip } from 'antd';

export default class NavButton extends PureComponent {
  handleClick = () => browserHistory.push(`/subskribble/${this.props.link}`);

  preventButtonFocus = e => e.target.blur();

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
        onFocus={this.preventButtonFocus}
      >
        <i className="material-icons nav-button-icon">{this.props.icon}</i>
      </Button>
    </Tooltip>
  );
}
