import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import styles from 'styles/styles.scss';
import PanelBody from 'components/app/panels/PanelBody/panelBody.js';
import TogglePanelVisibility from 'components/app/panels/TogglePanelVisibility/TogglePanelVisibility.js';

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
