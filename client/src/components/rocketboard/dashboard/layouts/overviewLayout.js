import map from 'lodash/map';
import React from 'react';

import { OVERVIEWROWS } from '../fields/dashboardFieldsData';

export default function() {
  return (
    <span>
      {map(OVERVIEWROWS, ({ subtitle, amount, className }, key) => {
        return (
          <div key={key} className={`panel-3 ${className}`}>
            <h3 className="subtitle">{subtitle}</h3>
            <h1 className="amount">{amount}</h1>
          </div>
        )
      })}
    </span>
  )
}
