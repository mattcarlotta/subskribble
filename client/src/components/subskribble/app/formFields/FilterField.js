import debounce from 'lodash/debounce'
import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { AntInput } from '../../../../containers/formfields/antReduxFormFields';
import IconButton from '../buttons/iconButton';

class FilterField extends Component {
  state = { filterField: '' }

  logInput = debounce(value => { this.setState({ filterField: value }) }, 300)

  handleResetField = () => {
    this.props.reset();
    this.setState({ filterField: '' });
  }

  handleFormChange = event => this.logInput(event.target.value);

  render() {
    const { placeholder } = this.props;
    return (
      <form className="filter-container" onChange={this.handleFormChange}>
        <div>
          <div className='form-90'>
            <Field
              name="filter"
              component={AntInput}
              placeholder={placeholder}
              ref="filter"
            />
          </div>
          <div className="form-05">
            {this.state.filterField.length > 0 &&
              <IconButton
                className="reset-field"
                icon="clear"
                iconClassName="reset-field-icon"
                onClickAction={this.handleResetField}
                tooltip="Reset Filter"
              />
            }
          </div>
        </div>
      </form>
    );
  }
}

export default FilterField = reduxForm({})(FilterField);
