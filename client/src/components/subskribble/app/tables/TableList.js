import map from 'lodash/map';
import React, { Component } from 'react';
import { Divider, Dropdown, Icon, Menu, Popconfirm, Table } from 'antd';
import EditableCell from './editableCell';
const { Item: MenuItem } = Menu;

class TableList extends Component {
    constructor(props) {
    super(props);
    this.columns = [
      ...this.appendHeaderData(this.props.TABLEHEADERS),
      {
        title: 'Actions',
        dataIndex: 'actions',
        render: (text, record) => (
          <span>
            <span className="editable-row-operations">
              {
                record.editable ?
                <span>
                  <a href="#" onClick={() => this.save(record.key)}>Save</a>
                  <Popconfirm
                    onConfirm={() => this.cancel(record.key)}
                    style={{ display: 'inline-block' }}
                    title="Are you sure you want to cancel?"
                  >
                    <a href="#">Cancel</a>
                  </Popconfirm>
                </span>
                : <a href="#" onClick={() => this.edit(record.key)}>Edit</a>
              }
            </span>
            <Divider type="vertical" />
            <a href="#">Delete</a>
            <Divider type="vertical" />
            <Dropdown overlay={this.moreActions} trigger={['click']}>
              <a className="ant-dropdown-link" href="#">
                Click me <Icon type="down" />
              </a>
            </Dropdown>
          </span>
        ),
      }
    ];
    this.state = { data: this.props.TABLECONTENTS };
    this.cacheData = this.state.data.map(item => ({ ...item }));
  }

  appendHeaderData = headers => (
    map(headers, item => (
      { ...item,  render: (text, record) => this.renderColumns(text, record, item.dataIndex) }
    ))
  )

  renderColumns = (text, record, column) => (
    <EditableCell
      editable={record.editable}
      value={text}
      onChange={value => this.handleChange(value, record.key, column)}
    />
  );

  handleChange = (value, key, column) => {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target[column] = value;
      this.setState({ data: newData });
    }
  }

  moreActions = (
    <Menu>
      <MenuItem key="0">
        <a href="http://www.alipay.com/">Activate</a>
      </MenuItem>
      <MenuItem key="1">
        <a href="http://www.taobao.com/">Suspend</a>
      </MenuItem>
      <MenuItem key="3">3rd menu item</MenuItem>
    </Menu>
  )

  edit = key => {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target.editable = true;
      this.setState({ data: newData });
    }
  }

  save = key => {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      delete target.editable;
      this.setState({ data: newData });
      this.cacheData = newData.map(item => ({ ...item }));
    }
  }

  cancel = key => {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
      delete target.editable;
      this.setState({ data: newData });
    }
  }

  render() {
    return (
      <div className="table-container">
        <Table bordered dataSource={this.state.data} columns={this.columns} />
      </div>
    )
  }
}

export default TableList;
