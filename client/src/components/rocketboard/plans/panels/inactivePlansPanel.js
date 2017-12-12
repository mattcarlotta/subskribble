import React from 'react';
import { browserHistory } from 'react-router';
import { Card, CardHeader, CardText } from 'material-ui/Card';

import { INACTIVEPLANS, TABLEHEADERS } from '../tables/plansData';
import CustomButton from '../../app/buttons/customButton';
import InactivePlansTable from '../tables/plansTable';
import FilterField from '../../app/formFields/FilterField';
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
            title="Inactive Plans"
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
                  label="Remove Plan"
                  onClickAction={() => browserHistory.push('/rocketboard/plans/activate-plan')}
                />
                <CustomButton
                  innerClassName="btn-reposition"
                  floatStyle="left"
                  label="View Plan"
                  onClickAction={() => browserHistory.push('/rocketboard/plans/view-plan')}
                />
              </div>
              <FilterField
                className="panel-4"
                floatingLabelText="Filter Inactive Plans"
                form="FilterInactivePlans"
              />
              <TableList TABLEBODYCONTENTS={() => InactivePlansTable(INACTIVEPLANS)} TABLEHEADERS={TABLEHEADERS} />
            </div>
          </CardText>
        </Card>
      </div>
    </div>
  )
}

export default InactivePlansPanel;
