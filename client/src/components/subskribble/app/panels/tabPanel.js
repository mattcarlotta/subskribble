import map from 'lodash/map';
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
    const { TABS } = this.props; // CARDS, selectFieldClassName,
    const { visible } = this.state;
    const display = visible ? "" : "none";
    const border = display ? 0 : null;
    return (
      <div className="panel-container">
        <Tabs className="tabs-container" tabBarStyle={{ border }} tabBarExtraContent={this.buttonPanel(visible)}>
          {map(TABS, title => (
            <TabPane tab={title} key={title}>
              <div className="panel-body-container">
                <div className="panel-body" style={{ display }}>
                  Content of {title}
                </div>
              </div>
            </TabPane>
          ))}
        </Tabs>
      </div>
    )
  }
}

export default TabPanel;
