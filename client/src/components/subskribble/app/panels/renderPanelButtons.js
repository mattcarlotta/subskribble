import map from 'lodash/map';
import React from 'react';

import CustomButton from '../../app/buttons/customButton';

export default ({CUSTOMBUTTONS}) => (
  map(CUSTOMBUTTONS, ({ className, label, onClickAction }, key) => (
    <CustomButton
      key={key}
      className={className}
      label={label}
      onClickAction={onClickAction}
    />
  ))
)
