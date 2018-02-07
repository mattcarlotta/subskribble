import React, { Component } from 'react';
import { Table } from 'antd';
import TableActions from '../../../components/subskribble/app/tables/TableActions'

class TableList extends Component {
  //TODO: AJAX request to retrieve TABLECONTENTS
  render() {
    const { TABLECONTENTS, TABLEHEADERS } = this.props;
    return (
      <div className="table-container">
        <Table
          columns={[
            ...TABLEHEADERS,
            {
              title: 'Actions',
              key: 'action',
              width: 365,
              render: record => <TableActions record={record} />
            }
          ]}
          dataSource={TABLECONTENTS}
        />
      </div>
    )
  }
}

export default TableList;
