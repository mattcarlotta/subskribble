import React, { PureComponent, Fragment } from 'react';
import EditItem from './EditItem';
import DeleteItem from './DeleteItem';
import MoreActions from './MoreActions';
import UpdateItemStatus from './UpdateItemStatus'

export default class TableActions extends PureComponent {
  render = () => {
    const { deleteAction, updateAction } = this.props;
    const { billevery, id, maxusage, status, type, uniquetemplatename } = this.props.record;
    const statusType = (status === "inactive" || status === "suspended") ? "activate" : "suspend";
    return (
      <Fragment>
        { updateAction
          ? <UpdateItemStatus id={id} statusType={statusType} updateAction={updateAction} />
          : null
        }
        {  uniquetemplatename
          ? <EditItem id={id}/>
          : null
        }
        <DeleteItem id={id} deleteAction={deleteAction} />
        { !type && !billevery && !maxusage && !uniquetemplatename
          ? <MoreActions id={id} />
          : null
        }
      </Fragment>
    )
  }
}
