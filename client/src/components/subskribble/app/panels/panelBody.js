import React, { Component } from 'react';
import FilterField from '../formFields/FilterField';
import RenderPanelButtons from './renderPanelButtons';
import SelectField from '../formFields/selectField';
import TableList from '../tables/TableList';

export default class PanelBody extends Component {
  state = { current: 1, sortByNum: 10 }

  componentDidUpdate = (prevProps) => {
    const { TABLERECORDS } = this.props;
    const { TABLERECORDS: NEXTRECORDS } = prevProps;
    if (TABLERECORDS !== NEXTRECORDS) this.setState({ current: 1, sortByNum: 10 })
  }

  setSortByNum = num => this.setState({ sortByNum: num })

  selectCurrentPage = page => this.setState({ current: page })

  render = () => {
    const {
      BUTTONFORM,
      BUTTONFORMTITLE,
      CARDBODY,
      CUSTOMBUTTONS,
      deleteAction,
      fetchAction,
      FILTERFORM,
      FILTERFIELDLABEL,
      GRAPH,
      SELECTFIELD,
      SUBMITFORMTITLE,
      TAB,
      TABLECONTENTS,
      TABLEHEADERS,
      TABLERECORDS,
      updateAction,
      visible
    } = this.props;
    const { current, sortByNum } = this.state;

    return (
      <div style={{ display: visible ? "block" : "none" }} className="panel-body-container">
        { CARDBODY && <CARDBODY /> }
        <div className="panel-body">
          <div className="ant-row">
            <div className="ant-col-8">
              { SELECTFIELD &&
                <SelectField
                  fetchAction={fetchAction}
                  OPTIONS={[10, 20, 50, 100]}
                  placeholder="Sort By"
                  setSortByNum={this.setSortByNum}
                  sortByNum={sortByNum}
                  selectCurrentPage={this.selectCurrentPage}
                  TAB={TAB.toLowerCase().replace(/\s/g, '')}
                />
              }
            </div>
            <div className="ant-col-8">
              { CUSTOMBUTTONS &&
                <RenderPanelButtons
                  CUSTOMBUTTONS={CUSTOMBUTTONS}
                  FORM={BUTTONFORM}
                  FORMTITLE={BUTTONFORMTITLE}
                  SUBMITFORMTITLE={SUBMITFORMTITLE}
                />
              }
            </div>
            <div className="ant-col-8 f-r">
              { FILTERFORM && <FilterField form={FILTERFORM} placeholder={FILTERFIELDLABEL} /> }
            </div>
          </div>
          { GRAPH && GRAPH }
          { TABLECONTENTS &&
            <TableList
              current={current}
              deleteAction={deleteAction}
              fetchAction={fetchAction}
              sortByNum={sortByNum}
              selectCurrentPage={this.selectCurrentPage}
              TAB={TAB.toLowerCase().replace(/\s/g, '')}
              TABLECONTENTS={TABLECONTENTS}
              TABLEHEADERS={TABLEHEADERS}
              TABLERECORDS={TABLERECORDS}
              updateAction={updateAction}
            />
          }
        </div>
      </div>
    )
  }
}
