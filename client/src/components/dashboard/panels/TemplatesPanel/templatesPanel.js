import React from 'react';
import PropTypes from 'prop-types';
import PieChart from '../../../app/charts/PieChart';
import MiniPanel from '../MiniPanel/miniPanel';
import NoData from '../NoData/noData';

const TemplatesPanel = ({ activetemplates, inactivetemplates }) => (
  <MiniPanel
    buttonIcon="library_add"
    buttonPushLocation="templates/create"
    buttonTipTitle="Create New Template"
    title="Templates"
    titleColor="#E06A4F"
    titleIcon="view_module"
  >
    {activetemplates > 0 || inactivetemplates > 0 ? (
      <PieChart
        data={[
          {
            id: 'Active',
            label: 'Active Templates',
            value: activetemplates ? parseInt(activetemplates, 10) : 0,
            color: '#00A896',
          },
          {
            id: 'Inactive',
            label: 'Inactive Templates',
            value: inactivetemplates ? parseInt(inactivetemplates, 10) : 0,
            color: '#F47560',
          },
        ]}
      />
    ) : (
      <NoData />
    )}
  </MiniPanel>
);

export default TemplatesPanel;

TemplatesPanel.propTypes = {
  activetemplates: PropTypes.string,
  inactivetemplates: PropTypes.string,
};
