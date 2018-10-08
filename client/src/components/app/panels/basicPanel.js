import map from 'lodash/map';
import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import PanelBody from './panelBody';
import TogglePanelVisibility from './TogglePanelVisibility';

const BasicPanel = ({
  buttonPanel,
  CARDS,
  cardTitle,
  className,
  visible,
  ...rest
}) => (
  <div className="panel-container">
    <Card className={className} title={cardTitle} extra={buttonPanel()}>
      {map(CARDS, (props, key) => (
        <PanelBody key={key} visible={visible} {...props} {...rest} />
      ))}
    </Card>
  </div>
);

export default TogglePanelVisibility(BasicPanel);

BasicPanel.propTypes = {
  buttonPanel: PropTypes.func.isRequired,
  CARDS: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  className: PropTypes.string,
  cardTitle: PropTypes.string,
  visible: PropTypes.bool,
};
