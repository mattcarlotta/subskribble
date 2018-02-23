import React from 'react';
import { Tabs } from 'antd';
import RenderCards from './renderCards';
import TogglePanelVisibility from './TogglePanelVisibility';

const TabPanel = ({buttonPanel, CARDS, selectFieldClassName, visible }) => (
  <div className="panel-container">
    <Tabs
      className="tabs-container"
      tabBarStyle={{ border: !visible ? 0 : null }}
      tabBarExtraContent={buttonPanel(visible)}
    >
      { RenderCards(CARDS, visible) }
    </Tabs>
  </div>
)

export default TogglePanelVisibility(TabPanel);
