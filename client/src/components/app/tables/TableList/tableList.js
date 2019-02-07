import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import TableActions from '../TableActions/TableActions.js';

class TableList extends PureComponent {
  static propTypes = {
    current: PropTypes.number,
    deleteAction: PropTypes.func,
    editLocation: PropTypes.string,
    fetchAction: PropTypes.func,
    refund: PropTypes.bool,
    selectCurrentPage: PropTypes.func,
    sortByNum: PropTypes.number,
    TAB: PropTypes.string,
    TABLECONTENTS: PropTypes.arrayOf(PropTypes.object),
    TABLEHEADERS: PropTypes.arrayOf(PropTypes.object),
    TABLERECORDS: PropTypes.number,
    updateAction: PropTypes.func,
  };

  handlePageChange = pagination => {
    let { current: limitCount } = pagination;
    this.props.selectCurrentPage(limitCount);
    limitCount -= 1;
    this.props.fetchAction(this.props.TAB, limitCount, this.props.sortByNum);
  };

  render = () => (
    <div className="tableList" style={{ margin: '10px 0' }}>
      <Table
        columns={[
          ...this.props.TABLEHEADERS,
          {
            title: 'Actions',
            key: 'action',
            render: record => (
              <TableActions
                deleteAction={this.props.deleteAction}
                editLocation={this.props.editLocation}
                record={record}
                refund={this.props.refund}
                updateAction={this.props.updateAction}
              />
            ),
          },
        ]}
        bordered={true} // eslint-disable-line react/jsx-boolean-value
        dataSource={this.props.TABLECONTENTS}
        onChange={this.handlePageChange}
        pagination={{
          defaultCurrent: 1,
          current: this.props.current,
          pageSize: this.props.sortByNum,
          total: this.props.TABLERECORDS,
        }}
      />
    </div>
  );
}

export default TableList;
