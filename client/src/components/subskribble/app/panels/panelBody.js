import React from 'react';
import FilterField from '../formFields/FilterField';
import RenderPanelButtons from './renderPanelButtons';
import SelectField from '../formFields/selectField';
import TableList from '../../../../containers/subskribble/tables/TableList';

export default ({
  BUTTONFORM,
  BUTTONFORMTITLE,
  CARDBODY,
  CUSTOMBUTTONS,
  FILTERFORM,
  FILTERFIELDLABEL,
  GRAPH,
  SELECTFIELDITEMS,
  SUBMITFORMTITLE,
  TABLECONTENTS,
  TABLEHEADERS,
  visible
}) => (
  <div style={{ display: visible ? "block" : "none" }} className="panel-body-container">
    { CARDBODY && <CARDBODY /> }
    <div className="panel-body">
      <div className="ant-row">
        <div className="ant-col-6">
          { SELECTFIELDITEMS && <SelectField placeholder="Sort By" OPTIONS={SELECTFIELDITEMS} /> }
        </div>
        <div className="ant-col-6 f-r">
          { CUSTOMBUTTONS &&
            <RenderPanelButtons
              CUSTOMBUTTONS={CUSTOMBUTTONS}
              FORM={BUTTONFORM}
              FORMTITLE={BUTTONFORMTITLE}
              SUBMITFORMTITLE={SUBMITFORMTITLE}
            />
          }
          { FILTERFORM && <FilterField placeholder={FILTERFIELDLABEL} form={FILTERFORM} /> }
        </div>
      </div>
      { GRAPH && GRAPH }
      { TABLECONTENTS && <TableList TABLECONTENTS={TABLECONTENTS} TABLEHEADERS={TABLEHEADERS} /> }
    </div>
  </div>
)
