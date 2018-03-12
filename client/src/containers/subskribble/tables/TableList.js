import React, { Component } from 'react';
import { Table } from 'antd';
import TableActions from '../../../components/subskribble/app/tables/TableActions'

class TableList extends Component {
  //TODO: AJAX request to retrieve TABLECONTENTS
  render = () => {
    const { TABLECONTENTS, TABLEHEADERS } = this.props;
    return (
      <div className="table-container">
        <Table
          columns={[
            ...TABLEHEADERS,
            {
              title: 'Actions',
              key: 'action',
              width: 370,
              render: record => <TableActions record={record} />
            }
          ]}
          dataSource={TABLECONTENTS}
          pagination={{ defaultCurrent: 1, total: 500 }}
        />
      </div>
    )
  }
}

export default TableList;
