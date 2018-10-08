import map from 'lodash/map';
import React, { PureComponent, Fragment } from 'react';
import { Select } from 'antd';
const { Option } = Select;

export default class SelectField extends PureComponent {
  handleSortDataBy = nextRecords => {
    const { fetchAction, TAB, setSortByNum, selectCurrentPage } = this.props;
    setSortByNum(nextRecords);
    selectCurrentPage(1);
    fetchAction(TAB, 0, nextRecords);
  };

  handleBlur = () => this._select.blur();

  render = () => {
    const { OPTIONS, placeholder, sortByNum } = this.props;

    return (
      <Fragment>
        <span style={{ textTransform: 'none' }}>Items per page: </span>
        <Select
          placeholder={placeholder}
          onSelect={this.handleSortDataBy}
          style={{ width: '100%', maxWidth: '68px' }}
          onChange={this.handleBlur}
          ref={node => (this._select = node)}
          value={sortByNum}
        >
          {map(OPTIONS, value => (
            <Option key={value} value={value}>
              {value}
            </Option>
          ))}
        </Select>
      </Fragment>
    );
  };
}
