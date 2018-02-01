// import map from 'lodash/map';
import React, { Component } from 'react';
import { Tabs, Button } from 'antd';
const { TabPane } = Tabs;

class TabPanel extends Component {
  state = { visible: true };

  changePanelVisibility = () => this.setState({ visible: !this.state.visible })

  buttonPanel = (visible) => (
    <Button className="panel-button" onClick={this.changePanelVisibility}>
    { visible
      ? <i className="material-icons">remove</i>
      : <i className="material-icons">add</i>
    }
    </Button>
  )

  render() {
    const { visible } = this.state;
    const display = visible ? "" : "none";
    return (
      <div className="panel-container">
        <Tabs className="tabs-container" tabBarExtraContent={this.buttonPanel(visible)}>
          <TabPane tab="Tab 1" key="1">
            <div className="panel-body-container">
              <div className="panel-body" style={{ display }}>
                Content of tab 1
              </div>
            </div>
          </TabPane>
          <TabPane tab="Tab 2" key="2">Content of tab 2</TabPane>
          <TabPane tab="Tab 3" key="3">Content of tab 3</TabPane>
        </Tabs>
      </div>
    )
  }
}

export default TabPanel;
