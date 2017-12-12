import map from 'lodash/map';
import React from 'react';
import { Table, TableBody,TableRow, TableRowColumn } from 'material-ui/Table';

export default function(CHARGESLIST) {
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
            map(CHARGESLIST, ({ status, invoice, customer, processor, amount, chargeDate },key) => {
              return (
                <TableRow key={key} className="override-table-style">
                  <TableRowColumn>
                    <span className={`label ${status}`}>
                      {status}
                    </span>
                  </TableRowColumn>
                  <TableRowColumn>{invoice}</TableRowColumn>
                  <TableRowColumn>{customer}</TableRowColumn>
                  <TableRowColumn>{processor}</TableRowColumn>
                  <TableRowColumn>{amount}</TableRowColumn>
                  <TableRowColumn>{chargeDate}</TableRowColumn>
                </TableRow>
              )
            })
          }
        </TableBody>
    </Table>
  );
}
