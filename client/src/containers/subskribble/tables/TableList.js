import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
import TableActions from '../../../components/subskribble/app/tables/TableActions';
import { fetchNextActiveSubscribers } from '../../../actions/tableActions';

class TableList extends PureComponent {
  handlePageChange = (pagination) => {
    let { TAB, sortByNum } = this.props;
    let { current: page } = pagination;
    TAB = TAB.toLowerCase().replace(/\s/g, '')
    sortByNum = sortByNum ? sortByNum : 10;
    page = page - 1;
    this.props.fetchNextActiveSubscribers(TAB, page, sortByNum);
  }

  render = () => {
    const { sortByNum, TABLECONTENTS, TABLEHEADERS, TABLERECORDS } = this.props;
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
          pagination={{ defaultCurrent: 1, pageSize: sortByNum, total: TABLERECORDS }}
          onChange={this.handlePageChange}
        />
      </div>
    )
  }
}

export default connect(state => ({ sortByNum: state.fields.sortByNum }), { fetchNextActiveSubscribers })(TableList);
