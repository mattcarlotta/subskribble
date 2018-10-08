import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Tooltip } from 'antd';
import BarChart from '../../app/charts/BarChart';
import CustomButton from '../../app/buttons/customButton';
import NoData from './noData';

const PlansPanel = ({ plans, popularplans }) => (
  <Col span={8}>
    <div className="mini-panel-container">
      <div className="tab-container">
        <h5 style={{ color: '#C55D5D' }} className="tab">
          <i className="material-icons">content_paste</i>
          <span className="title">Plans</span>
        </h5>
        <CustomButton
          buttonIcon="note_add"
          className="f-r"
          buttonPushLocation="plans/create"
          tipTitle="Add Plan"
        />
      </div>
      <hr />
      <div className="bar-chart-container">
        {plans && !isEmpty(popularplans) ? (
          <Row>
            <Col style={{ height: 319 }} span={8}>
              {/* eslint-disable */}
              <BarChart
                indexBy={'plans'}
                data={[
                  {
                    plans: 'Active Plans',
                    Plans: parseInt(plans, 10),
                    PlansColor: '#C55D5D',
                  },
                ]}
                keys={['Plans']}
              />
              {/* eslint-enable */}
            </Col>
            <Col style={{ height: 250 }} span={16}>
              <h5 className="top-5-title">Most Popular Plans</h5>
              <ul className="top-5">
                {map(popularplans, ({ planname, subscribers }, key) => (
                  <li key={key}>
                    <Tooltip
                      arrowPointAtCenter
                      placement="left"
                      trigger="hover"
                      title="Rank"
                    >
                      <span
                        className={`${key + 1 <= 3 ? 'active' : null} rank`}
                      >
                        {key + 1}.
                      </span>
                    </Tooltip>
                    <Tooltip
                      arrowPointAtCenter
                      placement="bottom"
                      trigger="hover"
                      title="Plan Name"
                    >
                      <span className="name">{planname}</span>
                    </Tooltip>
                    <Tooltip
                      arrowPointAtCenter
                      placement="right"
                      trigger="hover"
                      title="Subscribers"
                    >
                      <span
                        className={`${key + 1 <= 3 ? 'top-rank' : null} total`}
                      >
                        {subscribers}
                      </span>
                    </Tooltip>
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
        ) : (
          <NoData />
        )}
      </div>
    </div>
  </Col>
);

export default PlansPanel;

PlansPanel.propTypes = {
  plans: PropTypes.string,
  popularplans: PropTypes.arrayOf(PropTypes.object),
};
