import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon } from 'antd';
import { browserHistory } from 'react-router';
import PageContainer from '../../panels/PageContainer/pageContainer';
import CustomButton from '../../buttons/CustomButton/customButton';
import TogglePanelVisibility from '../../panels/TogglePanelVisibility/TogglePanelVisibility';
import styles from './noDataToDisplay.scss';

const NoDataToDisplay = ({
  buttonIcon,
  buttonPushLocation,
  buttonPanel,
  cardTitle,
  tipTitle,
  visible,
}) => (
  <PageContainer>
    <div className={styles.panelContainer}>
      <Card title={cardTitle} extra={buttonPanel()}>
        <div
          style={{ display: visible ? 'block' : 'none', minHeight: 400 }}
          className={styles.panelBodyContainer}
        >
          <div className={styles.panelBody}>
            <div className={styles.panelSpacer}>
              {buttonPushLocation && (
                <CustomButton
                  style={{ float: 'right' }}
                  buttonIcon={buttonIcon}
                  onClickAction={() =>
                    browserHistory.push(`/subskribble/${buttonPushLocation}`)
                  }
                  tipTitle={tipTitle}
                />
              )}
              <div className={styles.noData}>
                <Icon type="line-chart" />
                <h2>No data to display.</h2>
                <p>
                  You may not have any entries or the search filter does not
                  match any of our current records.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </PageContainer>
);

export default TogglePanelVisibility(NoDataToDisplay);

NoDataToDisplay.propTypes = {
  buttonIcon: PropTypes.string,
  buttonPushLocation: PropTypes.string,
  buttonPanel: PropTypes.func.isRequired,
  cardTitle: PropTypes.string,
  tipTitle: PropTypes.string,
  visible: PropTypes.bool,
};
