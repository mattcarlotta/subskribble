import map from 'lodash/map';
import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import PanelBody from '../PanelBody/panelBody';
import TogglePanelVisibility from '../TogglePanelVisibility/TogglePanelVisibility';
import styles from '../../../../styles';

const BasicPanel = ({ buttonPanel, CARDS, cardTitle, visible, ...rest }) => (
  <div className={styles.panelContainer}>
    <Card title={cardTitle} extra={buttonPanel()}>
      {map(CARDS, (props, key) => (
        <PanelBody key={key} visible={visible} {...props} {...rest} />
      ))}
    </Card>
  </div>
);

export default TogglePanelVisibility(BasicPanel);

BasicPanel.propTypes = {
  buttonPanel: PropTypes.func.isRequired,
  CARDS: PropTypes.arrayOf(PropTypes.object),
  cardTitle: PropTypes.string,
  visible: PropTypes.bool,
};
