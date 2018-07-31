import map from 'lodash/map';
import React from 'react';
import { Tabs } from 'antd';
import PanelBody from './panelBody';
import TogglePanelVisibility from './TogglePanelVisibility';
const { TabPane } = Tabs;

const TabPanel = ({ buttonPanel, CARDS, selectFieldClassName, visible, serverMessage }) => (
	<div className="panel-container">
		<Tabs
			className="tabs-container"
			tabBarStyle={{ border: !visible ? 0 : null }}
			tabBarExtraContent={buttonPanel()}
			>
			 {map(CARDS, (props) => (
				 <TabPane tab={props.TAB} key={props.TAB}>
					 <PanelBody serverMessage={serverMessage} visible={visible} {...props} />
				 </TabPane>
			 ))}
		</Tabs>
	</div>
)

export default TogglePanelVisibility(TabPanel);
