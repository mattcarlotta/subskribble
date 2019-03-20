import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { panelButton, materialIcons } from 'styles/styles.scss';

class TogglePanelVisibility extends Component {
  state = { visible: true };

  handleSwitchVisibility = () =>
    this.setState(prevState => ({ visible: !prevState.visible }));

  buttonPanel = () => (
    <Button className={panelButton} onClick={this.handleSwitchVisibility}>
      <i className={materialIcons}>{this.state.visible ? 'remove' : 'add'}</i>
    </Button>
  );

  render = () => (
    <Fragment>
      {this.props.children(this.state.visible, this.buttonPanel)}
    </Fragment>
  );
}

export default TogglePanelVisibility;

TogglePanelVisibility.propTypes = {
  children: PropTypes.func,
};
