import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'antd';
import PieChart from '../../app/charts/PieChart';
import CustomButton from '../../app/buttons/CustomButton/customButton';
import NoData from './noData';

const TemplatesPanel = ({ activetemplates, inactivetemplates }) => (
  <Col span={8}>
    <div className="mini-panel-container">
      <div className="tab-container">
        <h5 style={{ color: '#E06A4F' }} className="tab">
          <i className="material-icons">view_module</i>
          <span className="title">Templates</span>
        </h5>
        <CustomButton
          buttonIcon="library_add"
          className="f-r"
          buttonPushLocation="templates/create"
          tipTitle="Create New Template"
        />
      </div>
      <hr />
      <div className="details-container">
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
      </div>
    </div>
  </Col>
);

export default TemplatesPanel;

TemplatesPanel.propTypes = {
  activetemplates: PropTypes.string,
  inactivetemplates: PropTypes.string,
};
