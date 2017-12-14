import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default function({ className, floatStyle, label, onClickAction, outerClassName }) {
  return (
    <div className={className}>
      <RaisedButton
        onClick={onClickAction}
        label={label}
        buttonStyle={{ backgroundColor: '#03a9f3', fontFamily: 'Poppins Semi-Bold, sans-serif' }}
        labelColor={'#eee'}
      />
    </div>
  )
}
