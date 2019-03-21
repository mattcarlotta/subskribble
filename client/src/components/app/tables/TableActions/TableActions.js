import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import ActionButton from 'components/app/tables/ActionButton/actionButton.js';

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
          <ActionButton
            buttonAction={this.updateItem}
            button={buttonIcon}
            className="update"
            title={statusType}
            divider
          />
        )}
        {editLocation && (
          <ActionButton
            buttonAction={this.editItem}
            button="create"
            className="edit"
            title="edit"
            divider
          />
        )}
        {refund && (
          <ActionButton
            buttonAction={this.refundItem}
            button="monetization_on"
            className="refund"
            title="refund/credit"
            divider
          />
        )}
        {deleteAction && (
          <ActionButton
            buttonAction={this.deleteItem}
            button="delete"
            className="delete"
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
