import map from 'lodash/map';
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Select } from 'antd';
import { fetchNextActiveSubscribers } from '../../../actions/tableActions';
const { Option } = Select;

class SelectField extends PureComponent {
  handleSortDataBy = nextRecords => {
    const { fetchNextActiveSubscribers, TAB, setSortByNum, selectCurrentPage } = this.props;
    setSortByNum(nextRecords);
    selectCurrentPage(1);
    fetchNextActiveSubscribers(TAB, 0, nextRecords);
  };

  handleBlur = () => this._select.blur();

  render = () => {
    const {
      OPTIONS,
      placeholder,
    } = this.props;

    return (
      <Fragment>
        <span style={{ textTransform: 'none' }}>It per page: </span>
        <Select
          defaultValue={10}
          placeholder={placeholder}
          onSelect={this.handleSortDataBy}
          style={{ width: '100%', maxWidth: '68px' }}
          onChange={this.handleBlur}
          ref={node => this._select = node}
          >
            {map(OPTIONS, value => (
              <Option key={value} value={value}>{value}</Option>
            ))}
        </Select>
      </Fragment>
    )
  }


}

export default connect(null, { fetchNextActiveSubscribers })(SelectField);

/*
const SelectField = ({
  className,
  fetchNextActiveSubscribers,
  OPTIONS,
  placeholder,
  selectCurrentPage,
  setSortByNum,
  TAB
}) => {
  const handleSortDataBy = nextRecords => {
    setSortByNum(nextRecords);
    TAB = TAB.toLowerCase().replace(/\s/g, '')
    selectCurrentPage(1);
    fetchNextActiveSubscribers(TAB, 0, nextRecords);
  };

  return (
    <div className={className}>
      <span>Sort: </span>
      <Select
        defaultValue={10}
        placeholder={placeholder}
        onSelect={handleSortDataBy}
        style={{ width: '100%', maxWidth: '100px' }}
        >
          {map(OPTIONS, value => (
            <Option key={value} value={value}>{value}</Option>
          ))}
      </Select>
    </div>
  )
}

export default connect(null, { fetchNextActiveSubscribers })(SelectField);
*/
