import React from 'react';
import PropTypes from 'prop-types';

const EmptyPreview = ({ text }) => (
  <div className="box-empty">
    <div className="empty-icon">
      <i className="material-icons pencil">create</i>
      <div>{text}</div>
    </div>
  </div>
);

export default EmptyPreview;

EmptyPreview.propTypes = {
  text: PropTypes.string,
};
