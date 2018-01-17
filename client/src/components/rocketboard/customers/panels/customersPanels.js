import React from 'react';

import { ACTIVECUSTOMERS, ACTIVECUSTOMERSBUTTONS, INACTIVECUSTOMERS, INACTIVECUSTOMERSBUTTONS, TABLEHEADERS } from '../fields/customersFieldsData';
// import Panel from '../../app/panels/customPanel';
import CustomerTable from '../tables/customersTable';
import SliderPanel from '../../app/panels/SliderPanel';

const SELECTFIELDITEMS = ['10', '20', '50', 'All']

const CARDS = [
  {
    CUSTOMBUTTONS: ACTIVECUSTOMERSBUTTONS,
    FILTERFIELDLABEL: "Filter Active Customers",
    FILTERFORM: "FilterActiveCustomers",
    SELECTFIELDITEMS,
    TABLECONTENTS: <CustomerTable CUSTOMERLIST={ACTIVECUSTOMERS} />,
    TABLEHEADERS
  },
  {
    CUSTOMBUTTONS: INACTIVECUSTOMERSBUTTONS,
    FILTERFIELDLABEL: "Filter Active Customers",
    FILTERFORM: "FilterActiveCustomers",
    SELECTFIELDITEMS,
    TABLECONTENTS: <CustomerTable CUSTOMERLIST={INACTIVECUSTOMERS} />,
    TABLEHEADERS
  }
]

const CustomersPanels = () => (
  <SliderPanel
    key="customers-panel"
    CARDS={CARDS}
    selectFieldClassName="panel-1"
    TABS={["Active Customers", "Inactive Customers"]}
  />
)


export default CustomersPanels;
