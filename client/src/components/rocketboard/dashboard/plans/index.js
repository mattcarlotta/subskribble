import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';

import { data, options } from './chartFields'
import AddPlan from './addPlan';
import SelectField from '../../app/formFields/selectField';
import GraphChart from '../charts/graphChart';

export const Plans = () => {
  return (
    <div className="dash-plans-panel">
      <div className="panel-container">
        <Card
          style={{ boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px' }}
          initiallyExpanded={true}
          >
          <CardHeader
            style={{ borderBottom: '1px solid rgba(120, 130, 140, 0.13)', fontFamily: 'Poppins Medium, sans-serif', backgroundColor: '#03a9f3' }}
            title="Active Customers"
            titleColor="#fff"
            iconStyle={{ color: '#cbcbcb' }}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            <div className="panel-body">
              <SelectField className={'panel-6'} floatingLabelText={'Plan'} MENUITEMS={['Carlotta Prime']} />
              <AddPlan />
              <GraphChart data={data} options={options}/>
            </div>
          </CardText>
        </Card>
      </div>
    </div>
  )
}

export default Plans;
