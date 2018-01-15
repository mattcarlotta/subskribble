import map from 'lodash/map';
import React from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';

export default function(TEMPLATELIST) {
  return (
    map(TEMPLATELIST, ({ name, id, from }, key) => {
      return (
        <TableRow key={key} className="override-table-style">
          <TableRowColumn>{name}</TableRowColumn>
          <TableRowColumn>{id}</TableRowColumn>
          <TableRowColumn>{from}</TableRowColumn>
        </TableRow>
      )
    })
  );
}
