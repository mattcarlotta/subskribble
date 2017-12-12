import React from 'react';
import { browserHistory } from 'react-router';
import { Card, CardHeader, CardText } from 'material-ui/Card';

import { data, options } from './chartFields'
import CustomerButton from '../../app/buttons/customButton';
import SelectField from '../../app/formFields/selectField';
import GraphChart from '../charts/graphChart';

export const Customers = () => {
  return (
    <div className="dash-customers-panel">
      <div className="panel-container">
        <Card
          style={{ boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px' }}
          initiallyExpanded={true}
          >
          <CardHeader
            style={{  borderBottom: '1px solid rgba(120, 130, 140, 0.13)', fontFamily: 'Poppins Semi-Bold, san-senif', backgroundColor: '#F56342' }}
            title="Customers"
            titleColor={'#eee'}
            iconStyle={{ color: '#eee' }}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            <div className="panel-body">
              <SelectField
                className={'panel-6'}
                floatingLabelText={'Frequency'}
                MENUITEMS={['Current Month', 'Monthly', 'Yearly']}
              />
              <CustomerButton
                outerClassName={'panel-6'}
                floatStyle={'right'}
                label={'Add Customer'}
                onClickAction={() => browserHistory.push('/rocketboard/add-customer')}
              />
              <GraphChart data={data} options={options} />
            </div>
          </CardText>
        </Card>
      </div>
    </div>
  )
}

export default Customers;
