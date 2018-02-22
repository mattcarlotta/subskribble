import React from 'react';
import { Card } from 'antd';
import PanelBody from './panelBody';
import TogglePanelVisibility from './TogglePanelVisibility';

const BasicPanel = ({
  buttonPanel,
  containerClassName,
  CARDBODY,
  CARDS,
  title,
  visible
}) => (
  <div className={containerClassName}>
    <div className="panel-container">
      <Card title={title} extra={buttonPanel(visible)}>
       <div className="panel-body-container">
         <div className="panel-body" style={{ display: visible ? "" : "none" }}>
            { CARDBODY && <CARDBODY /> }
            { CARDS && PanelBody(CARDS, visible) }
         </div>
       </div>
      </Card>
    </div>
  </div>
)


export default TogglePanelVisibility(BasicPanel);
