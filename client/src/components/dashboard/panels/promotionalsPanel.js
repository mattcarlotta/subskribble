import map from 'lodash/map';
import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Tooltip } from 'antd';
import BarChart from '../../app/charts/BarChart';
import CustomButton from '../../app/buttons/customButton';
import NoData from './noData';

const PromosPanel = ({ popularpromotionals, promotionals }) => (
  <Col span={8}>
    <div className="mini-panel-container">
      <div className="tab-container">
        <h5 style={{ color: '#8E4479' }} className="tab">
          <i className="material-icons">new_releases</i>
          <span className="title">Promotionals</span>
        </h5>
        <CustomButton
          buttonIcon="playlist_add"
          className="f-r"
          buttonPushLocation="promotionals/create"
          tipTitle="Create New Promotional"
        />
      </div>
      <hr />
      <div className="details-container">
        {promotionals && popularpromotionals ? (
          <Row>
            <Col style={{ height: 319 }} span={8}>
              {/* eslint-disable */}
              <BarChart
                indexBy={'Promotionals'}
                data={[
                  {
                    Promotionals: 'Active Promotionals',
                    promotionals: parseInt(promotionals, 10),
                    promotionalsColor: '#8E4479',
                  },
                ]}
                keys={['promotionals']}
              />
              {/* eslint-enable */}
            </Col>
            <Col style={{ height: 250 }} span={16}>
              <h5 className="top-5-title">Most Used Promotionals</h5>
              <ul className="top-5">
                {map(popularpromotionals, ({ promocode }, key) => (
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
                      placement="left"
                      trigger="hover"
                      title="Promotional Name (Total Usage)"
                    >
                      <span
                        className={`${key + 1 <= 3 ? 'top-rank' : null} promo`}
                      >
                        {promocode}
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

export default PromosPanel;

PromosPanel.propTypes = {
  promotionals: PropTypes.string, // eslint-disable-line react/forbid-prop-types
  popularpromotionals: PropTypes.string, // eslint-disable-line react/forbid-prop-types
};
