import map from 'lodash/map';
import React from 'react';
import { Table, TableBody,TableRow, TableRowColumn } from 'material-ui/Table';

export default function(REFUNDSLIST) {
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
          }
        </TableBody>
    </Table>
  );
}
