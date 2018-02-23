import map from 'lodash/map';
import React from 'react';

import { OVERVIEWROWS } from '../fields/dashboardFieldsData';

export default () => (
  map(OVERVIEWROWS, ({ subtitle, amount }, key) => (
    <div key={key} className="panel-3">
      <h3 className="subtitle">{subtitle}</h3>
      <h1 className="amount">{amount}</h1>
    </div>
  ))
)
