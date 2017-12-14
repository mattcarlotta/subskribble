import React from 'react';

import { ACTIVECUSTOMERS, ACTIVECUSTOMERSBUTTONS, TABLEHEADERS } from '../fields/customersFieldsData';
import { INACTIVECUSTOMERS, INACTIVECUSTOMERSBUTTONS } from '../fields/customersFieldsData';

import Panel from '../../app/panels/customPanel';
import CustomerTable from '../tables/customersTable';

const CustomersPanels = () => {
  return (
    <span>
      <Panel
        containerClassName="active-panel"
        initiallyExpanded={true}
        title="Active Customers"
        CUSTOMBUTTONS={ACTIVECUSTOMERSBUTTONS}
        filterFieldLabel="Filter Active Customers"
        filterForm="FilterActiveCustomers"
        CreateTableBody={CustomerTable}
        TABLEDATA={ACTIVECUSTOMERS}
        TABLEHEADERS={TABLEHEADERS}
      />
      <Panel
        containerClassName="inactive-panel"
        initiallyExpanded={true}
        title="Inactive Customers"
        CUSTOMBUTTONS={INACTIVECUSTOMERSBUTTONS}
        filterFieldLabel="Filter Inactive Customers"
        filterForm="FilterInactiveCustomers"
        CreateTableBody={CustomerTable}
        TABLEDATA={INACTIVECUSTOMERS}
        TABLEHEADERS={TABLEHEADERS}
      />
    </span>
  )
}

export default CustomersPanels;
