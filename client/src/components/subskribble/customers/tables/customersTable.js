import map from 'lodash/map';
import React from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';

export default function({CUSTOMERLIST}) {
  return (
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
  )
}
