import map from 'lodash/map';
import React from 'react';
import PanelBody from './panelBody';
import { Tabs } from 'antd';
const { TabPane } = Tabs;

export default (CARDS, visible) => (
  map(CARDS, (PANEL, key) => {
    const PANELBODYITEMS = { ...PANEL, key, visible }
    const { TAB } = PANEL;
    return (
      TAB
        ? <TabPane tab={TAB} key={TAB}>
            <PanelBody {...PANELBODYITEMS} />
          </TabPane>
        : <PanelBody {...PANELBODYITEMS} />
    )
  })
)
