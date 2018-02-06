import React, { PureComponent } from 'react';
import { Button, Divider, Dropdown, Icon, Menu, Table } from 'antd';
const { Item: MenuItem } = Menu;

class TableList extends PureComponent {
  handleDelete = (record) => {
    console.log('delete this record', record);
  }

  handleSelectOption = (key, record) => {
    console.log(`handle this ${key}`, record);
  }

  handleStatusUpdate = (record) => {
    const { status, subscriber } = record;
    const newStatus = (status === "inactive" || status === "suspended") ? "active" : "suspended"
    console.log(`update ${subscriber}'s status from ${status} to ${newStatus}`);
  }

  renderMoreActions = (record) => (
    <Menu onClick={({key}) => this.handleSelectOption(key, record) }>
      <MenuItem key="Refund">
        Refund
      </MenuItem>
      <MenuItem key="Message">
        Message
      </MenuItem>
      <MenuItem key="Report">
        Report
      </MenuItem>
    </Menu>
  )

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
              render: (record) => {
                return (
                  <span>
                    {record.status === "inactive" || record.status === "suspended"
                      ? <Button onClick={() => this.handleStatusUpdate(record)}>Activate</Button>
                      : <Button onClick={() => this.handleStatusUpdate(record)}>Suspend</Button>
                    }
                    <Divider type="vertical" />
                    <Button onClick={() => this.handleDelete(record)}>Delete</Button>
                    <Divider type="vertical" />
                    <Dropdown overlay={this.renderMoreActions(record)} trigger={['click']}>
                      <Button className="ant-dropdown-link">
                        More Actions <Icon type="down" />
                      </Button>
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
}

export default TableList;
