import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'antd';
import PieChart from '../../../app/charts/PieChart';
import CustomButton from '../../../app/buttons/CustomButton/customButton';
import NoData from '../NoData/noData';

const SubscribersPanel = ({ inactivesubscribers, subscribers }) => (
  <Col span={8}>
    <div className="mini-panel-container">
      <div className="tab-container">
        <h5 style={{ color: '#00A896' }} className="tab">
          <i className="material-icons">people_outline</i>
          <span className="title">Subscribers</span>
        </h5>
        <CustomButton
          buttonIcon="person_add"
          className="f-r"
          buttonPushLocation="subscribers/register"
          tipTitle="Add Subscriber"
        />
      </div>
      <hr />
      <div className="details-container">
        {subscribers || inactivesubscribers > 0 ? (
          <PieChart
            data={[
              {
                id: 'Active',
                label: 'Active Subscribers',
                value: subscribers ? parseInt(subscribers, 10) : 0,
                color: '#00A896',
              },
              {
                id: 'Inactive',
                label: 'Inactive Subscribers',
                value: inactivesubscribers
                  ? parseInt(inactivesubscribers, 10)
                  : 0,
                color: '#F47560',
              },
            ]}
          />
        ) : (
          <NoData />
        )}
      </div>
    </div>
  </Col>
);

export default SubscribersPanel;

SubscribersPanel.propTypes = {
  subscribers: PropTypes.string,
  inactivesubscribers: PropTypes.string,
};
