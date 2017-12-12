import React from 'react';
import { browserHistory } from 'react-router';
import { Card, CardHeader, CardText } from 'material-ui/Card';

import { ACTIVECUSTOMERS, TABLEHEADERS } from '../tables/customersData';
import ActiveCustomerTable from '../tables/customersTable';
import CustomButton from '../../app/buttons/customButton';
import FilterField from '../../app/formFields/FilterField';
import SelectField from '../../app/formFields/selectField';
import TableList from '../../app/tables/TableList';

const ActiveCustomersPanel = () => {
  return (
    <div className="active-panel">
      <div className="panel-container">
        <Card
          style={{ boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px' }}
          initiallyExpanded={true}
          >
            <CardHeader
              style={{ borderBottom: '1px solid rgba(120, 130, 140, 0.13)', fontFamily: 'Poppins Semi-Bold, sans-serif', backgroundColor: '#F56342' }}
              title="Active Customers"
              titleColor="#eee"
              iconStyle={{ color: '#eee' }}
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true}>
              <div className="panel-body">
                <SelectField
                  className="panel-1"
                  floatingLabelText="Sort By"
                  MENUITEMS={['10', '20', '50', 'All']}
                />
                <div className="panel-6">
                  <CustomButton
                    innerClassName="btn-reposition"
                    floatStyle="left"
                    label="Add Customer"
                    onClickAction={() => browserHistory.push('/rocketboard/customers/add-customer')}
                  />
                  <CustomButton
                    innerClassName="btn-reposition"
                    floatStyle="left"
                    label="Suspend Customer"
                    onClickAction={() => browserHistory.push('/rocketboard/customers/suspend-customer')}
                  />
                  <CustomButton
                    innerClassName="btn-reposition"
                    floatStyle="left"
                    label="View Customer"
                    onClickAction={() => browserHistory.push('/rocketboard/customers/view-customer')}
                  />
                </div>
                <FilterField
                  className="panel-4"
                  floatingLabelText="Filter Active Customers"
                  form="FilterActiveCustomers"
                />
                <TableList TABLEBODYCONTENTS={() => ActiveCustomerTable(ACTIVECUSTOMERS)} TABLEHEADERS={TABLEHEADERS} />
              </div>
            </CardText>
          </Card>
        </div>
    </div>
  )
}

export default ActiveCustomersPanel;
