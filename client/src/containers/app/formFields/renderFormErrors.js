import React from 'react';
import PropTypes from 'prop-types';

const RenderFormErrors = ({ error, touched }) =>
  touched && error ? <p className="ant-form-explain"> {error} </p> : null;

RenderFormErrors.propTypes = {
  error: PropTypes.string,
  touched: PropTypes.bool,
};

export default RenderFormErrors;
