import map from 'lodash/map';
import React from 'react';

import CustomButton from '../../app/buttons/customButton';

export default function({CUSTOMBUTTONS}) {
  return map(CUSTOMBUTTONS, ({ className, label, onClickAction }, key) =>{
    return (
      <CustomButton
        key={key}
        className={className}
        label={label}
        onClickAction={onClickAction}
      />
    )
  })
}
