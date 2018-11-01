import React from 'react';
import PropTypes from 'prop-types';
import { boxEmpty, emptyIcon, materialIcons } from '../../../../styles';

const EmptyPreview = ({ text }) => (
  <div className={boxEmpty}>
    <div className={emptyIcon}>
      <i className={materialIcons}>create</i>
      <div>{text}</div>
    </div>
  </div>
);

export default EmptyPreview;

EmptyPreview.propTypes = {
  text: PropTypes.string,
};
