import map from 'lodash/map';
import React from 'react';
import { Tabs } from 'antd';
// import FilterField from '../../app/formFields/FilterField';
import RenderPanelButtons from './renderPanelButtons';
// import SelectField from '../../app/formFields/selectField';
// import TableList from '../../app/tables/TableList';
import TogglePanelVisibility from './TogglePanelVisibility';
const { TabPane } = Tabs;

const TabPanel = ({buttonPanel, CARDS, selectFieldClassName, TABS, visible }) => (
  <div className="panel-container">
    <Tabs
      className="tabs-container"
      tabBarStyle={{ border: !visible ? 0 : null }}
      tabBarExtraContent={buttonPanel(visible)}
    >
      {map(CARDS, ({
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
          <TabPane tab={TAB} key={TAB}>
            <div style={{ display: visible ? "" : "none" }} className="panel-body-container">
              { CARDBODY && <CARDBODY /> }
              <div className="panel-body">
                {/* { SELECTFIELDITEMS && <SelectField className={selectFieldClassName} floatingLabelText="Sort By" MENUITEMS={SELECTFIELDITEMS} /> } */}
                <div className="panel-6">
                  { CUSTOMBUTTONS && <RenderPanelButtons CUSTOMBUTTONS={CUSTOMBUTTONS}/> }
                </div>
                { GRAPH && GRAPH }
                {/* { FILTERFORM && <FilterField className="panel-4" floatingLabelText={FILTERFIELDLABEL} form={FILTERFORM} /> } */}
                {/* { TABLECONTENTS && <TableList TABLECONTENTS={TABLECONTENTS} TABLEHEADERS={TABLEHEADERS} /> } */}
              </div>
            </div>
          </TabPane>
      ))}
    </Tabs>
  </div>
)

export default TogglePanelVisibility(TabPanel);
