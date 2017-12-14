import React from 'react';

import {
  CHARGES,
  CHARGESBUTTONS,
  CHARGESTABLEHEADERS,
  REFUNDS,
  REFUNDSBUTTONS,
  REFUNDSTABLEHEADERS
} from '../fields/transactionsFieldsData';

import ChargesTable from '../tables/chargesTable';
import RefundsTable from '../tables/refundsTable';
import Panel from '../../app/panels/customPanel';

const TransactionsPanels = () => {
  return (
    <span>
      <Panel
        containerClassName="active-panel"
        initiallyExpanded={true}
        title="Charges"
        selectFieldClassName="panel-1"
        SELECTFIELDITEMS={['10', '20', '50', 'All']}
        CUSTOMBUTTONS={CHARGESBUTTONS}
        filterFieldLabel="Filter Charges"
        filterForm="FilterCharges"
        CreateTableBody={ChargesTable}
        TABLEDATA={CHARGES}
        TABLEHEADERS={CHARGESTABLEHEADERS}
      />
      <Panel
        containerClassName="active-panel"
        initiallyExpanded={true}
        title="Refunds"
        selectFieldClassName="panel-1"
        SELECTFIELDITEMS={['10', '20', '50', 'All']}
        CUSTOMBUTTONS={REFUNDSBUTTONS}
        filterFieldLabel="Filter Refunds"
        filterForm="FilterRefunds"
        CreateTableBody={RefundsTable}
        TABLEDATA={REFUNDS}
        TABLEHEADERS={REFUNDSTABLEHEADERS}
      />
    </span>
  )
}

export default TransactionsPanels;
