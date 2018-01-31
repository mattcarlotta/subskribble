import map from 'lodash/map';
import React from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';

export default function(FORMLIST) {
  return (
    map(FORMLIST, ({ name, gateway, id, plans },key) => {
      return (
        <TableRow key={key} className="override-table-style">
          <TableRowColumn>{name}</TableRowColumn>
          <TableRowColumn>{gateway}</TableRowColumn>
          <TableRowColumn>{id}</TableRowColumn>
          <TableRowColumn className="adjust-plans-position">
            <span className="subscription-count">
              {plans}
            </span>
          </TableRowColumn>
        </TableRow>
      )
    })
  );
}
