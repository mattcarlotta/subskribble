import React from 'react';
import FilterField from '../formFields/FilterField';
import RenderPanelButtons from '../../../components/subskribble/app/panels/renderPanelButtons';
import SelectField from '../formFields/selectField';
import TableList from '../tables/TableList';

const Panel = ({
  BUTTONFORM,
  BUTTONFORMTITLE,
  CARDBODY,
  CUSTOMBUTTONS,
  FILTERFORM,
  FILTERFIELDLABEL,
  GRAPH,
  SELECTFIELD,
  SUBMITFORMTITLE,
  TAB,
  TABLECONTENTS,
  TABLEHEADERS,
  TABLERECORDS,
  sortByNum,
  visible
}) => (
  <div style={{ display: visible ? "block" : "none" }} className="panel-body-container">
    { CARDBODY && <CARDBODY /> }
    <div className="panel-body">
      <div className="ant-row">
        <div className="ant-col-6">
          { SELECTFIELD &&
            <SelectField
              handleSortDataBy={this.handleSortDataBy}
              OPTIONS={[10, 20, 50, 100]}
              placeholder="Sort By"
              TAB={TAB}
            />
          }
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
          { FILTERFORM && <FilterField form={FILTERFORM} placeholder={FILTERFIELDLABEL} /> }
        </div>
      </div>
      { GRAPH && GRAPH }
      { TABLECONTENTS &&
        <TableList
          TAB={TAB}
          TABLECONTENTS={TABLECONTENTS}
          TABLEHEADERS={TABLEHEADERS}
          TABLERECORDS={TABLERECORDS}
        />
      }
    </div>
  </div>
)


export default Panel;
