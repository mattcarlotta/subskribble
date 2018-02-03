import React, { Component } from 'react';
import { Button } from 'antd';

export default WrappedComponent => {
  class TogglePanelVisibility extends Component {
    state = { visible: true };

    switchVisibility = () => this.setState({ visible: !this.state.visible })

    buttonPanel = (visible) => (
      <Button className="panel-button" onClick={this.switchVisibility}>
      { visible
        ? <i className="material-icons">remove</i>
        : <i className="material-icons">add</i>
      }
      </Button>
    )
    
    render() {
      return (
        <WrappedComponent
          {...this.props}
          buttonPanel={this.buttonPanel}
          visible={this.state.visible}
        />
      )
    }
  }
  return TogglePanelVisibility;
}
