import debounce from 'lodash/debounce'
import React, { Component } from 'react';
import { Input } from 'antd';

class FilterField extends Component {
  state = { filterField: '' }

  logInput = debounce(value => { this.setState({ filterField: value }) }, 300)

  handleResetField = () => {
    this.setState({ filterField: '' });
  }

  handleFormChange = event => this.setState({ filterField: event.target.value });

  handleFormSubmit = event => {
    event.preventDefault();
    console.log('final input', this.state.filterField);
  }

  render = () => (
    <form className="filter-container" onSubmit={this.handleFormSubmit} onChange={this.handleFormChange}>
      <Input
        name="filter"
        placeholder={this.props.placeholder}
        value={this.state.filterField}
      />
    </form>
  )
}

export default FilterField;
