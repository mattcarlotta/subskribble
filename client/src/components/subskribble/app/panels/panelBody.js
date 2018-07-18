import React, { Component } from 'react';
import CustomButton from '../../app/buttons/customButton';
import SelectField from '../formFields/selectField';
import TableList from '../tables/TableList';

export default class extends Component {
  state = { current: 1, sortByNum: 10 }

  componentDidUpdate = (prevProps) => {
    const { serverMessage, TABLERECORDS } = this.props;
    (TABLERECORDS !== prevProps.TABLERECORDS || (serverMessage !== prevProps.serverMessage && serverMessage !== undefined)) && this.resetTable();
  }

  resetTable = () => this.setState({ current: 1, sortByNum: 10 })

  setSortByNum = num => this.setState({ sortByNum: num })

  selectCurrentPage = page => this.setState({ current: page })

  render = () => {
    const { buttonPushLocation, CARDBODY, fetchAction, GRAPH, SELECTFIELD, TAB, TABLECONTENTS } = this.props;
    const tabTitle = TAB.toLowerCase().replace(/\s/g, '');

    return (
      <div style={{ display: this.props.visible ? "block" : "none" }} className="panel-body-container">
        { CARDBODY && <CARDBODY /> }
        <div className="panel-body">
          <div className="ant-row">
            <div className="ant-col-12">
              { SELECTFIELD &&
                <SelectField
                  {...this.state}
                  fetchAction={fetchAction}
                  OPTIONS={[10, 20, 50, 100]}
                  placeholder="Sort By"
                  setSortByNum={this.setSortByNum}
                  selectCurrentPage={this.selectCurrentPage}
                  TAB={tabTitle}
                />
              }
            </div>
            <div className="ant-col-12 f-r">
              { buttonPushLocation &&
                <CustomButton
                  buttonIcon={this.props.buttonIcon}
                  className="f-r"
                  buttonPushLocation={buttonPushLocation}
                  tipTitle={this.props.tipTitle}
                />
              }
            </div>
          </div>
          { GRAPH && <GRAPH /> }
          { TABLECONTENTS &&
            <TableList
              {...this.state}
              deleteAction={this.props.deleteAction}
              editLocation={this.props.editLocation}
              fetchAction={fetchAction}
              selectCurrentPage={this.selectCurrentPage}
              TAB={tabTitle}
              TABLECONTENTS={TABLECONTENTS}
              TABLEHEADERS={this.props.TABLEHEADERS}
              TABLERECORDS={this.props.TABLERECORDS}
              updateAction={this.props.updateAction}
            />
          }
        </div>
      </div>
    )
  }
}
