import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default function({ className, floatStyle, label, onClickAction }) {
  return (
    <div className={className}>
      <RaisedButton
        buttonStyle={{ backgroundColor: '#03a9f3', fontFamily: 'Poppins Semi-Bold, sans-serif' }}
        label={label}
        labelColor="#eee"
        onClick={onClickAction}
      />
    </div>
  )
}
