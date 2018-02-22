import map from 'lodash/map';
import React, { Fragment } from 'react';
import FilterField from '../formFields/FilterField';
import RenderPanelButtons from './renderPanelButtons';
import SelectField from '../formFields/selectField';
import TableList from '../../../../containers/subskribble/tables/TableList';

export default (PANELS, visible) => (
  map(PANELS, ({
    CARDBODY,
    CUSTOMBUTTONS,
    FILTERFORM,
    FILTERFIELDLABEL,
    GRAPH,
    SELECTFIELDITEMS,
    TABLECONTENTS,
    TAB,
    TABLEHEADERS
  }, key) => (
    <Fragment key={key}>
      { CARDBODY && <CARDBODY /> }
      <div className="ant-row">
        <div className="ant-col-6">
          { SELECTFIELDITEMS && <SelectField placeholder="Sort By" OPTIONS={SELECTFIELDITEMS} /> }
        </div>
        <div className="ant-col-6 f-r">
          { CUSTOMBUTTONS && <RenderPanelButtons CUSTOMBUTTONS={CUSTOMBUTTONS}/> }
          { FILTERFORM && <FilterField placeholder={FILTERFIELDLABEL} form={FILTERFORM} /> }
        </div>
      </div>
      { GRAPH && GRAPH }
      { TABLECONTENTS && <TableList TABLECONTENTS={TABLECONTENTS} TABLEHEADERS={TABLEHEADERS} /> }
    </Fragment>
  ))
)
