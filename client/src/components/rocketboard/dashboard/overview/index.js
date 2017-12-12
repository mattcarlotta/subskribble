import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';

export const Overview = () => {
  return (
    <div className="dash-overview-panel">
      <div className="panel-container">
        <Card
          style={{ boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px' }}
          initiallyExpanded={true}
          >
          <CardHeader
            style={{ borderBottom: '1px solid rgba(120, 130, 140, 0.13)', fontFamily: 'Poppins Semi-Bold, san-senif', backgroundColor: '#F56342' }}
            title="Overview - Dec 2017"
            titleColor={'#eee'}
            iconStyle={{ color: '#eee' }}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            <div className="panel-3">
              <h3 className="subtitle">MRR</h3>
              <h1 className="amount">$2,054.11</h1>
            </div>
            <div className="panel-3">
              <h3 className="subtitle">Payments Received</h3>
              <h1 className="amount">$568.13</h1>
            </div>
            <div className="panel-3">
              <h3 className="subtitle">Unpaid Invoices</h3>
              <h1 className="amount">$1,485.98</h1>
            </div>
            <div className="panel-3 no-b-r">
              <h3 className="subtitle">Net Revenue</h3>
              <h1 className="amount">$19,833.76</h1>
            </div>
          </CardText>
        </Card>
      </div>
    </div>
  )
}

export default Overview;
