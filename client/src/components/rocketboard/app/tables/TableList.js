import map from 'lodash/map';
import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';
import { Scrollbars } from 'react-custom-scrollbars';

const TableList = ({TABLECONTENTS, TABLEHEADERS }) => {
  return (
    <div className="table-container">
      <Table
        fixedHeader={false}
        selectable={true}
        multiSelectable={false}
      >
        <TableHeader
          className="override-table-style"
          displaySelectAll={false}
          adjustForCheckbox={true}
          enableSelectAll={true}
        >
          <TableRow>
            { map(TABLEHEADERS, label => (<TableHeaderColumn key={label}>{label}</TableHeaderColumn>)) }
          </TableRow>
        </TableHeader>
      </Table>
      <Scrollbars
        style={{ width: '100%' }}
        autoHeight
        autoHeightMin={50}
        autoHeightMax={250}
        autoHide
        autoHideTimeout={500}
        autoHideDuration={200}
        renderThumbVertical={props => <div {...props} className="scrollbar"/>}
        >
          <Table
            fixedHeader={false}
            selectable={true}
            multiSelectable={false}
            >
              <TableBody
                displayRowCheckbox={true}
                deselectOnClickaway={false}
                showRowHover={true}
              >
                { TABLECONTENTS }
          </TableBody>
        </Table>
      </Scrollbars>
    </div>
  );
}

export default TableList;
