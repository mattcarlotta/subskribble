import React, { Component } from 'react';
import CustomButton from '../../buttons/CustomButton/customButton.js';
import SelectField from '../../formFields/SelectField/selectField.js';
import TableList from '../../tables/TableList/tableList.js';
import { panelBodyContainer, panelBody } from './panelBody.scss';

export default class extends Component {
  state = { current: 1, sortByNum: 10 };

  componentDidUpdate = prevProps => {
    const { serverMessage, TABLERECORDS } = this.props;
    if (
      TABLERECORDS !== prevProps.TABLERECORDS ||
      (serverMessage !== prevProps.serverMessage && serverMessage !== undefined)
    )
      this.resetTable();
  };

  resetTable = () => this.setState({ current: 1, sortByNum: 10 });

  setSortByNum = num => this.setState({ sortByNum: num });

  selectCurrentPage = page => this.setState({ current: page });

  render = () => {
    const {
      buttonPushLocation,
      CARDBODY,
      fetchAction,
      GRAPH,
      SELECTFIELD,
      style,
      TAB,
      TABLECONTENTS,
    } = this.props;
    const tabTitle = TAB.toLowerCase().replace(/\s/g, '');

    return this.props.visible ? (
      <div className={panelBodyContainer}>
        {CARDBODY && <CARDBODY />}
        <div style={{ ...style }} className={panelBody}>
          <div style={{ marginBottom: 20 }} className="ant-row">
            <div className="ant-col-12">
              {SELECTFIELD && (
                <SelectField
                  {...this.state}
                  fetchAction={fetchAction}
                  OPTIONS={[10, 20, 50, 100]}
                  placeholder="Sort By"
                  setSortByNum={this.setSortByNum}
                  selectCurrentPage={this.selectCurrentPage}
                  TAB={tabTitle}
                />
              )}
            </div>
            <div style={{ float: 'right' }} className="ant-col-12">
              {buttonPushLocation && (
                <CustomButton
                  buttonIcon={this.props.buttonIcon}
                  style={{ float: 'right' }}
                  buttonPushLocation={buttonPushLocation}
                  tipTitle={this.props.tipTitle}
                />
              )}
            </div>
          </div>
          {GRAPH && <GRAPH />}
          {TABLECONTENTS && (
            <TableList
              {...this.state}
              deleteAction={this.props.deleteAction}
              editLocation={this.props.editLocation}
              fetchAction={fetchAction}
              refund={this.props.refund}
              selectCurrentPage={this.selectCurrentPage}
              TAB={tabTitle}
              TABLECONTENTS={TABLECONTENTS}
              TABLEHEADERS={this.props.TABLEHEADERS}
              TABLERECORDS={this.props.TABLERECORDS}
              updateAction={this.props.updateAction}
            />
          )}
        </div>
      </div>
    ) : null;
  };
}
