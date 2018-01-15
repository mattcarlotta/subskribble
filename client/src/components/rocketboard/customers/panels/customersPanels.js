import React from 'react';

import { ACTIVECUSTOMERS, ACTIVECUSTOMERSBUTTONS, INACTIVECUSTOMERS, INACTIVECUSTOMERSBUTTONS, TABLEHEADERS } from '../fields/customersFieldsData';
import Panel from '../../app/panels/customPanel';
import CustomerTable from '../tables/customersTable';

const CustomersPanels = () => [
  <Panel
    key="activecustomerspanel"
    containerClassName="active-panel"
    initiallyExpanded={true}
    title="Active Customers"
    selectFieldClassName="panel-1"
    SELECTFIELDITEMS={['10', '20', '50', 'All']}
    CUSTOMBUTTONS={ACTIVECUSTOMERSBUTTONS}
    filterFieldLabel="Filter Active Customers"
    FILTERFORM="FilterActiveCustomers"
    TABLECONTENTS={CustomerTable(ACTIVECUSTOMERS)}
    TABLEHEADERS={TABLEHEADERS}
  />,
  <Panel
    key="inactivecustomerspanel"
    containerClassName="inactive-panel"
    initiallyExpanded={true}
    title="Inactive Customers"
    selectFieldClassName="panel-1"
    SELECTFIELDITEMS={['10', '20', '50', 'All']}
    CUSTOMBUTTONS={INACTIVECUSTOMERSBUTTONS}
    filterFieldLabel="Filter Inactive Customers"
    FILTERFORM="FilterInactiveCustomers"
    TABLECONTENTS={CustomerTable(INACTIVECUSTOMERS)}
    TABLEHEADERS={TABLEHEADERS}
  />
]

export default CustomersPanels;
