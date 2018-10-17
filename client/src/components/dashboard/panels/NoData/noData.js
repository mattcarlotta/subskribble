import React from 'react';
import { Icon } from 'antd';
import { noData } from './noData.scss';

export default () => (
  <div className={noData}>
    <Icon style={{ fontSize: 148, color: '#bbbbbb' }} type="line-chart" />
    <h2>No data to display.</h2>
  </div>
);
