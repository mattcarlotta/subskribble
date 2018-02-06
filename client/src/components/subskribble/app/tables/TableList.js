import React from 'react';
import { Divider, Dropdown, Icon, Menu, Table } from 'antd';
const { Item: MenuItem } = Menu;

const menu = (
  <Menu>
    <MenuItem key="0">
      Refund
    </MenuItem>
    <MenuItem key="1">
      Message
    </MenuItem>
    <MenuItem key="3">
      Report
    </MenuItem>
  </Menu>
);

const TableList = ({TABLECONTENTS, TABLEHEADERS }) => {
  return (
    <div className="table-container">
      <Table
        columns={[
          ...TABLEHEADERS,
          {
            title: 'Actions',
            key: 'action',
            width: 360,
            render: (record) => {
              return (
                <span>
                  {record.status === "inactive" || record.status === "suspended"
                    ? <a href="#">Reactivate</a>
                    : <a href="#">Suspend</a>
                  }
                  <Divider type="vertical" />
                  <a href="#">Delete</a>
                  <Divider type="vertical" />
                  <Dropdown overlay={menu} trigger={['click']}>
                    <a className="ant-dropdown-link" href="#">
                      More Actions <Icon type="down" />
                    </a>
                  </Dropdown>
                </span>
              )
            }
          }
        ]}
        dataSource={TABLECONTENTS}
      />
    </div>
  )
}

export default TableList;
