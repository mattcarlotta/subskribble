import React from 'react';
import Avatar from 'material-ui/Avatar';

import matt from '../../../../images/people/matt.png'

export default function() {
  return (
    <Avatar
     src={matt}
     size={36}
     style={{ position: 'relative', top: 7 }}
   />
  )
}
