import React from 'react';
import { browserHistory } from 'react-router';
import { Card, CardHeader, CardText } from 'material-ui/Card';

import { REFUNDS, REFUNDSTABLEHEADERS } from '../tables/transactionsData';
import CustomButton from '../../app/buttons/customButton';
import FilterField from '../../app/formFields/FilterField';
import RefundsTable from '../tables/refundsTable';
import SelectField from '../../app/formFields/selectField';
import TableList from '../../app/tables/TableList';

const TransactionsRefundsPanel = () => {
  return (
    <div className="active-panel">
      <div className="panel-container">
        <Card
          style={{ boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px' }}
          initiallyExpanded={true}
          >
            <CardHeader
              style={{ borderBottom: '1px solid rgba(120, 130, 140, 0.13)', fontFamily: 'Poppins Light, sans-serif', backgroundColor: '#03a9f3' }}
              title="Refunds"
              titleColor="#fff"
              iconStyle={{ color: '#cbcbcb' }}
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
                <FilterField
                  className="panel-4"
                  floatingLabelText="Filter Refunds"
                  form="FilterRefunds"
                />
                <div className="panel-6">
                  <CustomButton
                    innerClassName="btn-reposition"
                    floatStyle="left"
                    label="Remove Refund"
                    onClickAction={() => browserHistory.push('/rocketboard/transactions/remove-refund')}
                  />
                </div>
                <TableList TABLEBODYCONTENTS={() => RefundsTable(REFUNDS)} TABLEHEADERS={REFUNDSTABLEHEADERS} />
              </div>
            </CardText>
          </Card>
        </div>
    </div>
  )
}

export default TransactionsRefundsPanel;
