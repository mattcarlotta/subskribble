import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
import TableActions from '../../../components/subskribble/app/tables/TableActions';
import { fetchNextActiveSubscribers } from '../../../actions/tableActions';

class TableList extends PureComponent {
  handlePageChange = (pagination) => {
    let { TAB, sortByNum: nextRecords } = this.props;
    let { current: limitCount } = pagination;
    TAB = TAB.toLowerCase().replace(/\s/g, '')
    this.props.selectCurrentPage(limitCount)
    limitCount = limitCount - 1;
    this.props.fetchNextActiveSubscribers(TAB, limitCount, nextRecords);
  }

  render = () => {
    const { current, sortByNum, TABLECONTENTS, TABLEHEADERS, TABLERECORDS } = this.props;
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
          pagination={{ defaultCurrent: 1, current, pageSize: sortByNum, total: TABLERECORDS }}
          onChange={this.handlePageChange}
        />
      </div>
    )
  }
}

export default connect(null, { fetchNextActiveSubscribers })(TableList);
