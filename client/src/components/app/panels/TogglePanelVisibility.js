import React, { Component } from 'react';
import { Button } from 'antd';

export default WrappedComponent => {
  class TogglePanelVisibility extends Component {
    state = { visible: true };

    handleSwitchVisibility = () =>
      this.setState(prevState => ({ visible: !prevState.visible }));

    buttonPanel = () => (
      <Button className="panel-button" onClick={this.handleSwitchVisibility}>
        <i className="material-icons">
          {this.state.visible ? 'remove' : 'add'}
        </i>
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

// TogglePanelVisibility.propTypes = {};
