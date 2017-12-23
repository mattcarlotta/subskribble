import React from 'react';
import Avatar from 'material-ui/Avatar';

import matt from '../../../../images/people/matt.png'

export default function({ size, marginSize }) {
  return (
    <Avatar
     src={matt}
     size={size}
     style={{ position: 'relative', top: 7, marginBottom: marginSize }}
   />
  )
}
