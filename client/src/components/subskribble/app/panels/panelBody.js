import React, { Component } from 'react';
import CustomButton from '../../app/buttons/customButton';
import SelectField from '../formFields/selectField';
import TableList from '../tables/TableList';

export default class PanelBody extends Component {
  state = { current: 1, sortByNum: 10 }

  componentDidUpdate = (prevProps) => {
    if (this.props.TABLERECORDS !== prevProps.TABLERECORDS) this.setState({ current: 1, sortByNum: 10 })
  }

  setSortByNum = num => this.setState({ sortByNum: num })

  selectCurrentPage = page => this.setState({ current: page })

  render = () => {
    const {
      buttonAction,
      buttonLabel,
      CARDBODY,
      deleteAction,
      fetchAction,
      GRAPH,
      SELECTFIELD,
      TAB,
      TABLECONTENTS,
      TABLEHEADERS,
      TABLERECORDS,
      updateAction,
      visible
    } = this.props;
    const { current, sortByNum } = this.state;
    const tabTitle = TAB.toLowerCase().replace(/\s/g, '');

    return (
      <div style={{ display: visible ? "block" : "none" }} className="panel-body-container">
        { CARDBODY && <CARDBODY /> }
        <div className="panel-body">
          <div className="ant-row">
            <div className="ant-col-12">
              { SELECTFIELD &&
                <SelectField
                  fetchAction={fetchAction}
                  OPTIONS={[10, 20, 50, 100]}
                  placeholder="Sort By"
                  setSortByNum={this.setSortByNum}
                  sortByNum={sortByNum}
                  selectCurrentPage={this.selectCurrentPage}
                  TAB={tabTitle}
                />
              }
            </div>
            <div className="ant-col-12 f-r">
              { buttonAction && <CustomButton className="f-r" label={buttonLabel} onClickAction={buttonAction} /> }
            </div>
          </div>
          { GRAPH && <GRAPH /> }
          { TABLECONTENTS &&
            <TableList
              current={current}
              deleteAction={deleteAction}
              fetchAction={fetchAction}
              sortByNum={sortByNum}
              selectCurrentPage={this.selectCurrentPage}
              TAB={tabTitle}
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
