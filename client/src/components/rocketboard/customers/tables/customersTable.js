import map from 'lodash/map';
import React from 'react';
import { Table, TableBody,TableRow, TableRowColumn } from 'material-ui/Table';

export default function(CUSTOMERLIST) {
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
            map(CUSTOMERLIST, ({ status, gateway, name, email, phone, subs },key) => {
              return (
                <TableRow key={key} className="override-table-style">
                  <TableRowColumn>
                    <span className={`label ${status}`}>
                      {status}
                    </span>
                  </TableRowColumn>
                  <TableRowColumn>{gateway}</TableRowColumn>
                  <TableRowColumn>{name}</TableRowColumn>
                  <TableRowColumn>{email}</TableRowColumn>
                  <TableRowColumn>{phone}</TableRowColumn>
                  <TableRowColumn className="adjust-subscriptions-position">
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
