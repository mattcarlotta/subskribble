import map from 'lodash/map';
import React from 'react';
import { Table, TableBody,TableRow, TableRowColumn } from 'material-ui/Table';

export default function(CAMPAIGNLIST) {
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
          }
        </TableBody>
    </Table>
  );
}
