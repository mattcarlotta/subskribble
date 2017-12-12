import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default function({ className, floatStyle, innerClassName, label, onClickAction, outerClassName }) {
  return (
    <div className={outerClassName}>
      <div className={innerClassName}>
        <RaisedButton
          onClick={onClickAction}
          label={label}
          style={{ float: floatStyle }}
          buttonStyle={{ backgroundColor: '#03a9f3', fontFamily: 'Poppins Semi-Bold, sans-serif' }}
          labelColor={'#eee'}
        />
      </div>
    </div>
  )
}
