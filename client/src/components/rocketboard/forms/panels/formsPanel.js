import React from 'react';
import { browserHistory } from 'react-router';
import { Card, CardHeader, CardText } from 'material-ui/Card';

import { ACTIVEFORMS, TABLEHEADERS } from '../tables/formsData';
import FormTable from '../tables/formsTable';
import CustomButton from '../../app/buttons/customButton';
import FilterField from '../../app/formFields/FilterField';
import SelectField from '../../app/formFields/selectField';
import TableList from '../../app/tables/TableList';

const FormPanel = () => {
  return (
    <div className="active-panel">
      <div className="panel-container">
        <Card
          style={{ boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px' }}
          initiallyExpanded={true}
          >
            <CardHeader
              style={{ borderBottom: '1px solid rgba(120, 130, 140, 0.13)', fontFamily: 'Poppins Semi-Bold, sans-serif', backgroundColor: '#F56342' }}
              title="Forms"
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
                    label="Add Form"
                    onClickAction={() => browserHistory.push('/rocketboard/forms/new')}
                  />
                </div>
                <FilterField
                  className="panel-4"
                  floatingLabelText="Filter Forms"
                  form="FilterForms"
                />
                <TableList TABLEBODYCONTENTS={() => FormTable(ACTIVEFORMS)} TABLEHEADERS={TABLEHEADERS} />
              </div>
            </CardText>
          </Card>
        </div>
    </div>
  )
}

export default FormPanel;
