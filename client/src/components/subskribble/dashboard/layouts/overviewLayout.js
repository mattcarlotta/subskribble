import map from 'lodash/map';
import React from 'react';

import { OVERVIEWROWS } from '../fields/dashboardFieldsData';

export default function() {
  return map(OVERVIEWROWS, ({ subtitle, amount, className }, key) => {
      return (
        <div key={key} className={ className ? `panel-3 ${className}` : "panel-3"}>
          <h3 className="subtitle">{subtitle}</h3>
          <h1 className="amount">{amount}</h1>
        </div>
      )
    }
  )
}
