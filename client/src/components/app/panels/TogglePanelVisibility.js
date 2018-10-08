import React, { Component } from 'react';
import { Button } from 'antd';

export default WrappedComponent => {
  class TogglePanelVisibility extends Component {
    state = { visible: true };

    switchVisibility = () => this.setState({ visible: !this.state.visible });

    buttonPanel = () => (
      <Button className="panel-button" onClick={this.switchVisibility}>
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
