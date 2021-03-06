import React from 'react';
import PropTypes from 'prop-types';
import MiniPanel from 'components/dashboard/MiniPanel/miniPanel.js';
import NoData from 'components/dashboard/NoData/noData.js';
import PieChart from 'components/app/charts/PieChart.js';

const SubscribersPanel = ({ inactivesubscribers, subscribers }) => (
  <MiniPanel
    buttonIcon="person_add"
    buttonPushLocation="subscribers/register"
    buttonTipTitle="Add Subscriber"
    title="Subscribers"
    titleColor="#00A896"
    titleIcon="people_outline"
  >
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
            value: inactivesubscribers ? parseInt(inactivesubscribers, 10) : 0,
            color: '#F47560',
          },
        ]}
      />
    ) : (
      <NoData />
    )}
  </MiniPanel>
);

SubscribersPanel.propTypes = {
  subscribers: PropTypes.string,
  inactivesubscribers: PropTypes.string,
};

export default SubscribersPanel;
