import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Divider } from 'antd';
import { browserHistory } from 'react-router';
import ActionButton from '../ActionButton/actionButton.js';

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
      <span className="tableActions">
        {updateAction && (
          <Fragment>
            <ActionButton
              buttonAction={this.updateItem}
              button={buttonIcon}
              className="update"
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
              className="edit"
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
              className="refund"
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
            className="delete"
            popTitle="Are you sure you want to delete this item?"
            title="delete"
          />
        )}
      </span>
    );
  };
}

TableActions.propTypes = {
  deleteAction: PropTypes.func,
  record: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  refund: PropTypes.bool,
  editLocation: PropTypes.string,
  updateAction: PropTypes.func,
};
