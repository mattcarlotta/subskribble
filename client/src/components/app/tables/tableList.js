import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import TableActions from './TableActions';

const TableList = ({
  current,
  deleteAction,
  editLocation,
  fetchAction,
  refund,
  selectCurrentPage,
  sortByNum,
  TAB,
  TABLECONTENTS,
  TABLEHEADERS,
  TABLERECORDS,
  updateAction,
}) => {
  const handlePageChange = pagination => {
    let { current: limitCount } = pagination;
    selectCurrentPage(limitCount);
    limitCount -= 1;
    fetchAction(TAB, limitCount, sortByNum);
  };

  return (
    <div className="table-container">
      <Table
        columns={[
          ...TABLEHEADERS,
          {
            title: 'Actions',
            key: 'action',
            render: record => (
              <TableActions
                deleteAction={deleteAction}
                editLocation={editLocation}
                record={record}
                refund={refund}
                updateAction={updateAction}
              />
            ),
          },
        ]}
        bordered={true} // eslint-disable-line react/jsx-boolean-value
        dataSource={TABLECONTENTS}
        onChange={handlePageChange}
        pagination={{
          defaultCurrent: 1,
          current,
          pageSize: sortByNum,
          total: TABLERECORDS,
        }}
      />
    </div>
  );
};

export default TableList;

TableList.propTypes = {
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
