import map from 'lodash/map';
import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';

import CustomButton from '../../app/buttons/customButton';
import FilterField from '../../app/formFields/FilterField';
import SelectField from '../../app/formFields/selectField';
import TableList from '../../app/tables/TableList';

const CustomPanel = ({
  containerClassName,
  initiallyExpanded,
  title,
  CUSTOMBUTTONS,
  selectFieldClassName,
  SELECTFIELDITEMS,
  FORM,
  CARDBODY,
  GRAPH,
  filterFieldLabel,
  filterForm,
  CreateTableBody,
  TABLEDATA,
  TABLEHEADERS
}) => {
  return (
    <div className={containerClassName}>
      <div className="panel-container">
        <Card
          style={{ boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px' }}
          initiallyExpanded={initiallyExpanded}
          >
            <CardHeader
              style={{ borderBottom: '1px solid rgba(120, 130, 140, 0.13)', fontFamily: 'Poppins Medium, sans-serif', backgroundColor: '#fff' }}
              title={title}
              titleColor="#8f979f"
              iconStyle={{ color: '#8f979f' }}
              closeIcon={<FontIcon className="material-icons">add</FontIcon>}
              openIcon={<FontIcon className="material-icons">remove</FontIcon>}
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true}>
              { FORM !== undefined && <FORM /> }
              { CARDBODY !== undefined && <CARDBODY /> }
              <div className="panel-body">
                { SELECTFIELDITEMS !== undefined
                  ? <SelectField
                      className={selectFieldClassName}
                      floatingLabelText="Sort By"
                      MENUITEMS={SELECTFIELDITEMS}
                    />
                  : null
                }
                <div className="panel-6">
                  { CUSTOMBUTTONS !== undefined
                    ? map(CUSTOMBUTTONS, ({ className, label, onClickAction }, key) =>{
                        return (
                          <CustomButton
                            key={key}
                            className={className}
                            label={label}
                            onClickAction={onClickAction}
                          />
                        )
                      })
                    : null
                  }
                </div>
                { GRAPH !== undefined && <GRAPH /> }
                {filterForm !== undefined
                  ? <FilterField
                      className="panel-4"
                      floatingLabelText={filterFieldLabel}
                      form={filterForm}
                    />
                  : null
                }
                { CreateTableBody !== undefined
                  ? <TableList TABLECONTENTS={() => CreateTableBody(TABLEDATA)} TABLEHEADERS={TABLEHEADERS} />
                  : null
                }
              </div>
            </CardText>
          </Card>
        </div>
    </div>
  )
}

export default CustomPanel;
