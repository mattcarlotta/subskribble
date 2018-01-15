import map from 'lodash/map';
import React from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';

export default function(PLANLIST) {
  return (
    map(PLANLIST, ({ name, amount, setupFee, billEvery, trialPeriod, subs },key) => {
      return (
        <TableRow key={key} className="override-table-style">
          <TableRowColumn>{name}</TableRowColumn>
          <TableRowColumn>{amount}</TableRowColumn>
          <TableRowColumn>{setupFee}</TableRowColumn>
          <TableRowColumn>{billEvery}</TableRowColumn>
          <TableRowColumn>{trialPeriod}</TableRowColumn>
          <TableRowColumn className="adjust-subscribers-position">
            <span className="subscription-count">
              {subs}
            </span>
          </TableRowColumn>
        </TableRow>
      )
    })
  );
}
