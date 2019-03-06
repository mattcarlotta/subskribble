import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import PanelBody from '../PanelBody/panelBody.js';
import TogglePanelVisibility from '../TogglePanelVisibility/TogglePanelVisibility.js';
import styles from '../../../../styles/styles.scss';

const BasicPanel = ({ cardTitle, ...props }) => (
  <div className={styles.panelContainer}>
    <TogglePanelVisibility>
      {(visible, buttonPanel) => (
        <Card
          bodyStyle={{ display: visible ? 'block' : 'none' }}
          title={cardTitle}
          extra={buttonPanel()}
        >
          <PanelBody
            style={{ margin: 0, padding: 0 }}
            visible={visible}
            {...props}
          />
        </Card>
      )}
    </TogglePanelVisibility>
  </div>
);

export default BasicPanel;

BasicPanel.propTypes = {
  cardTitle: PropTypes.string,
};