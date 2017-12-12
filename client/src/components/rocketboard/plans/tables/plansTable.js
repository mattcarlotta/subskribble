import map from 'lodash/map';
import React from 'react';
import { Table, TableBody,TableRow, TableRowColumn } from 'material-ui/Table';

export default function(PLANLIST) {
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
            map(PLANLIST, ({ name, amount, setupFee, billEvery, trialPeriod, subs },key) => {
              return (
                <TableRow key={key} className="override-table-style">
                  <TableRowColumn>{name}</TableRowColumn>
                  <TableRowColumn>{amount}</TableRowColumn>
                  <TableRowColumn>{setupFee}</TableRowColumn>
                  <TableRowColumn>{billEvery}</TableRowColumn>
                  <TableRowColumn>{trialPeriod}</TableRowColumn>
                  <TableRowColumn className="adjust-subscribers-position">
                    <span className="subscription-count">
                      {subs}
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
