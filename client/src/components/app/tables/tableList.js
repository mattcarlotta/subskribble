import React from 'react';
import { Table } from 'antd';
import TableActions from './TableActions';

export default ({
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
    limitCount = limitCount - 1;
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
        bordered={true}
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
