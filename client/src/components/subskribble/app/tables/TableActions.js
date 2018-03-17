import React, { PureComponent, Fragment } from 'react';
import EditItem from '../../../../containers/subskribble/app/tables/EditItem';
import DeleteItem from '../../../../containers/subskribble/app/tables/DeleteItem';
import MoreActions from '../../../../containers/subskribble/app/tables/MoreActions';
import UpdateItemStatus from '../../../../containers/subskribble/app/tables/UpdateItemStatus'

export default class TableActions extends PureComponent {
  render = () => {
    const { billEvery, id, invoice, maxUsage, planName, promoName, status, templateName, type } = this.props.record;
    const statusType = (status === "inactive" || status === "suspended") ? "activate" : "suspend";
    return (
      <Fragment>
        { status && !invoice
          ? <UpdateItemStatus userid={id} statusType={statusType} />
          : null
        }
        {  planName || promoName || templateName
          ? <EditItem userid={id}/>
          : null
        }
        <DeleteItem userid={id} />
        { !type && !billEvery && !maxUsage
          ? <MoreActions userid={id} />
          : null
        }
      </Fragment>
    )
  }
}
