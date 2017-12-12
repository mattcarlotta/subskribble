import map from 'lodash/map';
import React from 'react';
import { Table, TableBody,TableRow, TableRowColumn } from 'material-ui/Table';

export default function(SUBLIST) {
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
            map(SUBLIST, ({ status, customer, plan, startDate, endDate, amount },key) => {
              return (
                <TableRow key={key} className="override-table-style">
                  <TableRowColumn>
                    <span className={`label ${status}`}>
                      {status}
                    </span>
                  </TableRowColumn>
                  <TableRowColumn>{customer}</TableRowColumn>
                  <TableRowColumn>{plan}</TableRowColumn>
                  <TableRowColumn>{startDate}</TableRowColumn>
                  <TableRowColumn>
                    <span className={ status === 'active' || status === 'late' ? 'adjust-enddate-position': ''}>
                      {endDate}
                    </span>
                  </TableRowColumn>
                  <TableRowColumn>{amount}</TableRowColumn>
                </TableRow>
              )
            })
          }
        </TableBody>
    </Table>
  );
}
