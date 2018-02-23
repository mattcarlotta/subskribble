import React from 'react';
import { Card } from 'antd';
import RenderCards from './renderCards';
import TogglePanelVisibility from './TogglePanelVisibility';

const BasicPanel = ({
  buttonPanel,
  containerClassName,
  CARDS,
  title,
  visible
}) => (
  <div className={containerClassName}>
    <div className="panel-container">
      <Card title={title} extra={buttonPanel(visible)}>
        { RenderCards(CARDS, visible) }
      </Card>
    </div>
  </div>
)


export default TogglePanelVisibility(BasicPanel);
