import map from 'lodash/map';
import React from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';

export default function(CAMPAIGNLIST) {
  return (
    map(CAMPAIGNLIST, ({ status, name, amount, maxUsage, totalUsage },key) => {
      return (
        <TableRow key={key} className="override-table-style">
          <TableRowColumn>
            <span className={`label ${status}`}>
              {status}
            </span>
          </TableRowColumn>
          <TableRowColumn>{name}</TableRowColumn>
          <TableRowColumn>{amount}</TableRowColumn>
          <TableRowColumn>{maxUsage}</TableRowColumn>
          <TableRowColumn>{totalUsage}</TableRowColumn>
        </TableRow>
      )
    })
  );
}
