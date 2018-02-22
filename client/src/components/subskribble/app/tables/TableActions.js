import React, { PureComponent, Fragment } from 'react';
import EditItem from './EditItem';
import DeleteItem from './DeleteItem';
import MoreActions from './MoreActions';
import UpdateItemStatus from './UpdateItemStatus'

export default class TableActions extends PureComponent {
  render = () => {
    const { billEvery, id, invoice, maxUsage, planName, promoName, status, templateName, type } = this.props.record;
    const statusButton = (status === "inactive" || status === "suspended") ? "activate" : "suspend";
    return (
      <Fragment>
        { status && !invoice
          ? <UpdateItemStatus userid={id} statusButton={statusButton} />
          : null
        }
        {  planName || promoName || templateName
          ? <EditItem id={id}/>
          : null
        }
        <DeleteItem id={id} />
        { !type && !billEvery && !maxUsage
          ? <MoreActions userid={id} />
          : null
        }
      </Fragment>
    )
  }
}
