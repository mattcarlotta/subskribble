import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';

import AddNewTemplate from '../../../../containers/forms/rocketboard/addNewTemplate';

const NewTemplatesPanel = () => {
  return (
    <div className="active-panel">
      <div className="panel-container">
        <Card
          style={{ boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px' }}
          initiallyExpanded={false}
          >
            <CardHeader
              style={{ borderBottom: '1px solid rgba(120, 130, 140, 0.13)', fontFamily: 'Poppins Semi-Bold, sans-serif', backgroundColor: '#F56342' }}
              title="Create A New Template"
              titleColor="#eee"
              iconStyle={{ color: '#eee' }}
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true}>
              <AddNewTemplate />
            </CardText>
          </Card>
        </div>
    </div>
  )
}

export default NewTemplatesPanel;
