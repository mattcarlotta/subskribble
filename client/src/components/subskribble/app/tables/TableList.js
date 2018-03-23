import React, { PureComponent } from 'react';
import { Table } from 'antd';
import TableActions from './TableActions';

export default class TableList extends PureComponent {
  handlePageChange = (pagination) => {
    const { fetchAction, TAB, sortByNum } = this.props;
    let { current: limitCount } = pagination;
    this.props.selectCurrentPage(limitCount);
    limitCount = limitCount - 1;
    fetchAction(TAB, limitCount, sortByNum);
  }

  render = () => {
    const { current, deleteAction, sortByNum, TABLECONTENTS, TABLEHEADERS, TABLERECORDS, updateAction } = this.props;
    return (
      <div className="table-container">
        <Table
          columns={[
            ...TABLEHEADERS,
            {
              title: 'Actions',
              key: 'action',
              width: 370,
              render: record => <TableActions deleteAction={deleteAction} record={record} updateAction={updateAction} />
            }
          ]}
          dataSource={TABLECONTENTS}
          pagination={{ defaultCurrent: 1, current, pageSize: sortByNum, total: TABLERECORDS }}
          onChange={this.handlePageChange}
        />
      </div>
    )
  }
}