import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Tooltip } from 'antd';
import BarChart from 'components/app/charts/BarChart.js';
import MiniPanel from 'components/dashboard/MiniPanel/miniPanel.js';
import NoData from 'components/dashboard/NoData/noData.js';
import styles from 'styles/styles.scss';

const PlansPanel = ({ plans, popularplans }) => (
  <MiniPanel
    buttonIcon="note_add"
    buttonPushLocation="plans/create"
    buttonTipTitle="Add Plan"
    title="Plans"
    titleColor="#C55D5D"
    titleIcon="content_paste"
  >
    {plans && !isEmpty(popularplans) ? (
      <Row>
        <Col style={{ height: 319 }} span={8}>
          {/* eslint-disable */}
          <BarChart
            indexBy="plans"
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
          <h5 className={styles.top5Title}>Most Popular Plans</h5>
          <ul className={styles.top5}>
            {map(popularplans, ({ planname, subscribers }, key) => (
              <li key={key}>
                <Tooltip
                  arrowPointAtCenter
                  placement="left"
                  trigger="hover"
                  title="Rank"
                >
                  <span
                    className={`${
                      key + 1 <= 3 ? `${styles.dashActive}` : null
                    } ${styles.dashRank}`}
                  >
                    {key + 1}.
                  </span>
                </Tooltip>
                <Tooltip
                  arrowPointAtCenter
                  placement="left"
                  trigger="hover"
                  title="Plan Name"
                >
                  <span className={styles.dashName}>{planname}</span>
                </Tooltip>
                <Tooltip
                  arrowPointAtCenter
                  placement="right"
                  trigger="hover"
                  title="Subscribers"
                >
                  <span
                    className={`${key + 1 <= 3 ? `${styles.topRank}` : null} ${
                      styles.dashTotal
                    }`}
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
  </MiniPanel>
);

PlansPanel.propTypes = {
  plans: PropTypes.string,
  popularplans: PropTypes.arrayOf(PropTypes.object),
};

export default PlansPanel;
