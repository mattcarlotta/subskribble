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

const TransactionsPanels = () => [
  <Panel
    key="chargespanel"
    containerClassName="active-panel"
    initiallyExpanded={true}
    title="Charges"
    selectFieldClassName="panel-1"
    SELECTFIELDITEMS={['10', '20', '50', 'All']}
    CUSTOMBUTTONS={CHARGESBUTTONS}
    filterFieldLabel="Filter Charges"
    FILTERFORM="FilterCharges"
    TABLECONTENTS={ChargesTable(CHARGES) }
    TABLEHEADERS={CHARGESTABLEHEADERS}
  />,
  <Panel
    key="refundspanel"
    containerClassName="active-panel"
    initiallyExpanded={true}
    title="Refunds"
    selectFieldClassName="panel-1"
    SELECTFIELDITEMS={['10', '20', '50', 'All']}
    CUSTOMBUTTONS={REFUNDSBUTTONS}
    filterFieldLabel="Filter Refunds"
    FILTERFORM="FilterRefunds"
    TABLECONTENTS={RefundsTable(REFUNDS)}
    TABLEHEADERS={REFUNDSTABLEHEADERS}
  />
]

export default TransactionsPanels;
