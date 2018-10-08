import map from 'lodash/map';
import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import PanelBody from './panelBody';
import TogglePanelVisibility from './TogglePanelVisibility';

const { TabPane } = Tabs;

const TabPanel = ({ buttonPanel, CARDS, visible, serverMessage }) => (
  <div className="panel-container">
    <Tabs
      className="tabs-container"
      tabBarStyle={{ border: !visible ? 0 : null }}
      tabBarExtraContent={buttonPanel()}
    >
      {map(CARDS, props => (
        <TabPane tab={props.TAB} key={props.TAB}>
          <PanelBody
            serverMessage={serverMessage}
            visible={visible}
            {...props}
          />
        </TabPane>
      ))}
    </Tabs>
  </div>
);

export default TogglePanelVisibility(TabPanel);

TabPanel.propTypes = {
  buttonPanel: PropTypes.func.isRequired,
  CARDS: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  TAB: PropTypes.string,
  visible: PropTypes.bool,
  serverMessage: PropTypes.string,
};
