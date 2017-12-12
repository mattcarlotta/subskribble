import React from 'react';
import { browserHistory } from 'react-router';
import { Card, CardHeader, CardText } from 'material-ui/Card';

import { ACTIVETEMPLATES, TABLEHEADERS } from '../tables/formsData';
import CustomButton from '../../app/buttons/customButton';
import FilterField from '../../app/formFields/FilterField';
import SelectField from '../../app/formFields/selectField';
import TableList from '../../app/tables/TableList';
import TemplateTable from '../tables/templatesForm';

const TemplatesPanel = () => {
  return (
    <div className="active-panel">
      <div className="panel-container">
        <Card
          style={{ boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px' }}
          initiallyExpanded={true}
          >
            <CardHeader
              style={{ borderBottom: '1px solid rgba(120, 130, 140, 0.13)', fontFamily: 'Poppins Semi-Bold, sans-serif', backgroundColor: '#F56342' }}
              title="Templates"
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
                    label="Edit Template"
                    onClickAction={() => browserHistory.push('/rocketboard/templates/edit')}
                  />
                  <CustomButton
                    innerClassName="btn-reposition"
                    floatStyle="left"
                    label="Remove Template"
                    onClickAction={() => browserHistory.push('/rocketboard/templates/delete')}
                  />
                </div>
                <FilterField
                  className="panel-4"
                  floatingLabelText="Filter Templates"
                  form="FilterTemplates"
                />
                <TableList TABLEBODYCONTENTS={() => TemplateTable(ACTIVETEMPLATES)} TABLEHEADERS={TABLEHEADERS} />
              </div>
            </CardText>
          </Card>
        </div>
    </div>
  )
}

export default TemplatesPanel;
