import map from 'lodash/map';
import React from 'react';
import { Table, TableBody,TableRow, TableRowColumn } from 'material-ui/Table';

export default function(TEMPLATELIST) {
  return (
    <Table
      fixedHeader={false}
      selectable={true}
      multiSelectable={false}
      >
        <TableBody
          displayRowCheckbox={true}
          deselectOnClickaway={false}
          showRowHover={true}
          stripedRows={true}
        >
          {
            map(TEMPLATELIST, ({ name, id, from }, key) => {
              return (
                <TableRow key={key} className="override-table-style">
                  <TableRowColumn>{name}</TableRowColumn>
                  <TableRowColumn>{id}</TableRowColumn>
                  <TableRowColumn>{from}</TableRowColumn>
                </TableRow>
              )
            })
          }
        </TableBody>
    </Table>
  );
}
