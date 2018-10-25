import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Tooltip } from 'antd';
import MiniPanel from '../MiniPanel/miniPanel';
import BarChart from '../../app/charts/BarChart';
import NoData from '../NoData/noData';
import styles from '../../../styles/index.scss';

const PromosPanel = ({ popularpromotionals, promotionals }) => (
  <MiniPanel
    buttonIcon="playlist_add"
    buttonPushLocation="promotionals/create"
    buttonTipTitle="Create New Promotional"
    title="Promotionals"
    titleColor="#8E4479"
    titleIcon="new_releases"
  >
    {promotionals && !isEmpty(popularpromotionals) ? (
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
          <h5 className={styles.top5Title}>Most Used Promotionals</h5>
          <ul className={styles.top5}>
            {map(popularpromotionals, ({ promocode }, key) => (
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
                  title="Promotional Name"
                >
                  <span
                    className={`${key + 1 <= 3 ? `${styles.topRank}` : null} ${
                      styles.dashPromo
                    }`}
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
  </MiniPanel>
);

export default PromosPanel;

PromosPanel.propTypes = {
  promotionals: PropTypes.string,
  popularpromotionals: PropTypes.arrayOf(PropTypes.object),
};
