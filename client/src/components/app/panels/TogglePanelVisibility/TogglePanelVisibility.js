import React, { Component } from 'react';
import { Button } from 'antd';
import { panelButton, materialIcons } from '../../../../styles';

export default WrappedComponent => {
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
      <WrappedComponent
        {...this.props}
        buttonPanel={this.buttonPanel}
        visible={this.state.visible}
      />
    );
  }
  return TogglePanelVisibility;
};
