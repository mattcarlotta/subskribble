import map from 'lodash/map';
import React from 'react';
import { Card } from 'antd';
import PanelBody from './panelBody';
import TogglePanelVisibility from './TogglePanelVisibility';

const BasicPanel = ({
  buttonPanel,
  CARDS,
  title,
  visible
}) => (
  <div className="panel-container">
    <Card title={title} extra={buttonPanel()}>
      {map(CARDS, (props, key) => <PanelBody key={key} visible={visible} {...props} />)}
    </Card>
  </div>
)


export default TogglePanelVisibility(BasicPanel);
