import map from 'lodash/map';
import React from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';

export default function(REFUNDSLIST) {
  return (
    map(REFUNDSLIST, ({ type, id, customer, processor, amount, refundDate },key) => {
      return (
        <TableRow key={key} className="override-table-style">
          <TableRowColumn>
            <span className={`label ${type}`}>
              {type}
            </span>
          </TableRowColumn>
          <TableRowColumn>{id}</TableRowColumn>
          <TableRowColumn>{customer}</TableRowColumn>
          <TableRowColumn>{processor}</TableRowColumn>
          <TableRowColumn>{amount}</TableRowColumn>
          <TableRowColumn>{refundDate}</TableRowColumn>
        </TableRow>
      )
    })
  );
}
