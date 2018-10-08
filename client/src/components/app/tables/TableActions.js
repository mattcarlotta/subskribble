import React, { PureComponent, Fragment } from 'react';
import { Divider } from 'antd';
import { browserHistory } from 'react-router';
import ActionButton from './actionButton';

const getStatusType = status =>
  status === 'inactive' || status === 'suspended' ? 'activate' : 'suspend';

export default class TableActions extends PureComponent {
  deleteItem = () => {
    const {
      deleteAction,
      record: { id, plan },
    } = this.props;
    deleteAction(id, plan);
  };

  editItem = () => {
    const {
      editLocation,
      record: { id },
    } = this.props;
    browserHistory.push(
      `/subskribble/${editLocation}/edit/${editLocation}?id=${id}`,
    );
  };

  refundItem = () => {
    const { id } = this.props.record;
    browserHistory.push(`/subskribble/transactions/edit/transaction?id=${id}`);
  };

  updateItem = () => {
    const {
      updateAction,
      record: { status, id },
    } = this.props;
    const statusType = getStatusType(status);
    const updateType = statusType === 'activate' ? 'activated' : 'suspended';
    const statusChange = statusType === 'activate' ? 'active' : 'suspended';
    updateAction(updateType, statusChange, id);
  };

  render = () => {
    const { deleteAction, editLocation, refund, updateAction } = this.props;
    const statusType = getStatusType(this.props.record.status);
    const buttonIcon =
      statusType === 'activate' ? 'settings_backup_restore' : 'do_not_disturb';

    return (
      <Fragment>
        {updateAction && (
          <Fragment>
            <ActionButton
              buttonAction={this.updateItem}
              button={buttonIcon}
              popTitle={`Are you sure you want to ${statusType} this item?`}
              title={statusType}
            />
            <Divider type="vertical" />
          </Fragment>
        )}
        {editLocation && (
          <Fragment>
            <ActionButton
              buttonAction={this.editItem}
              button="create"
              popTitle="Are you sure you want to edit this item?"
              title="edit"
            />
            <Divider type="vertical" />
          </Fragment>
        )}
        {refund && (
          <Fragment>
            <ActionButton
              buttonAction={this.refundItem}
              button="monetization_on"
              popTitle="Are you sure you want to refund/credit this item?"
              title="refund/credit"
            />
            <Divider type="vertical" />
          </Fragment>
        )}
        {deleteAction && (
          <ActionButton
            buttonAction={this.deleteItem}
            button="delete"
            popTitle="Are you sure you want to delete this item?"
            title="delete"
          />
        )}
      </Fragment>
    );
  };
}
