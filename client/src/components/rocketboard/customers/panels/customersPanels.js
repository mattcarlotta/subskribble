import React from 'react';

import { ACTIVECUSTOMERS, ACTIVECUSTOMERSBUTTONS, INACTIVECUSTOMERS, INACTIVECUSTOMERSBUTTONS, TABLEHEADERS } from '../fields/customersFieldsData';

import Panel from '../../app/panels/customPanel';
import CustomerTable from '../tables/customersTable';

const CustomersPanels = () => {
  return (
    <span>
      <Panel
        containerClassName="active-panel"
        initiallyExpanded={true}
        title="Active Customers"
        selectFieldClassName="panel-1"
        selectFieldLabel="Sort By"
        SELECTFIELDITEMS={['10', '20', '50', 'All']}
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
        selectFieldClassName="panel-1"
        selectFieldLabel="Sort By"
        SELECTFIELDITEMS={['10', '20', '50', 'All']}
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
