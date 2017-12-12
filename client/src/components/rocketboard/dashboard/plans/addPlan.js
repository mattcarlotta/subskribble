import React from 'react';
import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

export default function() {
  return (
    <div className="panel-6">
      <RaisedButton
        onClick={() => browserHistory.push('/rocketboard/add-plan')}
        label="Add Plan"
        style={{ float: 'right' }}
        buttonStyle={{ backgroundColor: '#03a9f3' }}
        labelColor={'#eee'}
      />
    </div>
  )
}
