import React, { Fragment } from 'react';
import EditItem from './EditItem';
import DeleteItem from './DeleteItem';
import MoreActions from './MoreActions';
import UpdateItemStatus from './UpdateItemStatus'

export default ({deleteAction, editLocation, updateAction, record: {billevery, id, maxusage, planname, status, type, uniquetemplatename}}) => {
  const statusType = (status === "inactive" || status === "suspended") ? "activate" : "suspend";
  return (
    <Fragment>
      { updateAction ? <UpdateItemStatus id={id} statusType={statusType} updateAction={updateAction} /> : null }
      { editLocation ? <EditItem id={id} editLocation={editLocation} /> : null }
      <DeleteItem id={id} plan={planname} deleteAction={deleteAction} />
      { !type && !billevery && !maxusage && !uniquetemplatename ? <MoreActions id={id} /> : null }
    </Fragment>
  )
}
