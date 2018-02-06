import map from 'lodash/map';
import React from 'react';
import { Tabs } from 'antd';
import FilterField from '../formFields/FilterField';
import RenderPanelButtons from './renderPanelButtons';
import SelectField from '../formFields/selectField';
import TableList from '../../app/tables/TableList';
import TogglePanelVisibility from './TogglePanelVisibility';
const { TabPane } = Tabs;

const TabPanel = ({buttonPanel, CARDS, selectFieldClassName, visible }) => (
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
        }) => (
          <TabPane tab={TAB} key={TAB}>
            <div style={{ display: visible ? "" : "none" }} className="panel-body-container">
              { CARDBODY && <CARDBODY /> }
              <div className="panel-body">
                <div className="ant-row">
                  <div className="ant-col-6">
                    { SELECTFIELDITEMS && <SelectField placeholder="Sort By" OPTIONS={SELECTFIELDITEMS} /> }
                  </div>
                  <div className="ant-col-6 f-r">
                    { CUSTOMBUTTONS && <RenderPanelButtons CUSTOMBUTTONS={CUSTOMBUTTONS}/> }
                    { FILTERFORM && <FilterField className="panel-4" placeholder={FILTERFIELDLABEL} form={FILTERFORM} /> }
                  </div>
                </div>
                { GRAPH && GRAPH }
                { TABLECONTENTS && <TableList TABLECONTENTS={TABLECONTENTS} TABLEHEADERS={TABLEHEADERS} /> }
              </div>
            </div>
          </TabPane>
      ))}
    </Tabs>
  </div>
)

export default TogglePanelVisibility(TabPanel);
