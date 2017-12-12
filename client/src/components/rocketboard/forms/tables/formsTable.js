import map from 'lodash/map';
import React from 'react';
import { Table, TableBody,TableRow, TableRowColumn } from 'material-ui/Table';

export default function(FORMLIST) {
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
          }
        </TableBody>
    </Table>
  );
}
