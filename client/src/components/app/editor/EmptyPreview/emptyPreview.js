import React from 'react';
import {
  boxEmpty,
  emptyIcon,
  materialIcons,
} from '../../../../styles/styles.scss';

const EmptyPreview = () => (
  <div className={boxEmpty}>
    <div className={emptyIcon}>
      <i className={materialIcons}>create</i>
      <div>Fill in the fields to update this preview!</div>
    </div>
  </div>
);

export default EmptyPreview;
