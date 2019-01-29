import map from 'lodash/map';
import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import PanelBody from '../PanelBody/panelBody.js';
import TogglePanelVisibility from '../TogglePanelVisibility/TogglePanelVisibility.js';
import { panelContainer, tabsContainer } from './tabPanel.scss';

const { TabPane } = Tabs;

const TabPanel = ({ CARDS, serverMessage }) => (
  <div className={panelContainer}>
    <TogglePanelVisibility>
      {(visible, buttonPanel) => (
        <Tabs
          className={tabsContainer}
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
      )}
    </TogglePanelVisibility>
  </div>
);

export default TabPanel;

TabPanel.propTypes = {
  CARDS: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  TAB: PropTypes.string,
  serverMessage: PropTypes.string,
};
