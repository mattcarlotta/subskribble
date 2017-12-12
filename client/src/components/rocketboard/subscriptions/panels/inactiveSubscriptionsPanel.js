import React from 'react';
import { browserHistory } from 'react-router';
import { Card, CardHeader, CardText } from 'material-ui/Card';

import { INACTIVESUBSCRIPTIONS, TABLEHEADERS } from '../tables/subscriptionsData';
import CustomButton from '../../app/buttons/customButton';
import FilterField from '../../app/formFields/FilterField';
import InactiveSubscriptionsTable from '../tables/subscriptionsTable';
import SelectField from '../../app/formFields/selectField';
import TableList from '../../app/tables/TableList';

const InactivePlansPanel = () => {
  return(
    <div className="inactive-panel">
      <div className="panel-container">
        <Card
          style={{ boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px' }}
          initiallyExpanded={true}
          >
          <CardHeader
            style={{ borderBottom: '1px solid rgba(120, 130, 140, 0.13)', fontFamily: 'Poppins Semi-Bold, san-senif', backgroundColor: '#F56342' }}
            title="Inactive Subscriptions"
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
                  label="Reactive Subscription"
                  onClickAction={() => browserHistory.push('/rocketboard/subscriptions/activate-subscription')}
                />
                <CustomButton
                  innerClassName="btn-reposition"
                  floatStyle="left"
                  label="Remove Subscription"
                  onClickAction={() => browserHistory.push('/rocketboard/subscriptions/activate-subscription')}
                />
                <CustomButton
                  innerClassName="btn-reposition"
                  floatStyle="left"
                  label="View Subscription"
                  onClickAction={() => browserHistory.push('/rocketboard/subscriptions/view-subscription')}
                />
              </div>
              <FilterField
                className="panel-4"
                floatingLabelText="Filter Inactive Subscriptions"
                form="FilterInactiveSubscriptions"
              />
              <TableList TABLEBODYCONTENTS={() => InactiveSubscriptionsTable(INACTIVESUBSCRIPTIONS)} TABLEHEADERS={TABLEHEADERS} />
            </div>
          </CardText>
        </Card>
      </div>
    </div>
  )
}

export default InactivePlansPanel;
