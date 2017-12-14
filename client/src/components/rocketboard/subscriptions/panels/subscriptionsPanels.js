import React from 'react';

import { ACTIVESUBSCRIPTIONS, ACTIVESUBSBUTTONS, TABLEHEADERS } from '../fields/subscriptionsFieldsData';
import { INACTIVESUBSCRIPTIONS, INACTIVESUBSBUTTONS } from '../fields/subscriptionsFieldsData';

import SubscriptionsTable from '../tables/subscriptionsTable';
import Panel from '../../app/panels/customPanel';

const SubscriptionsPanels = () => {
  return (
    <span>
      <Panel
        containerClassName="active-panel"
        initiallyExpanded={true}
        title="Active Subscriptions"
        CUSTOMBUTTONS={ACTIVESUBSBUTTONS}
        filterFieldLabel="Filter Active Subscriptions"
        filterForm="FilterActiveSubscriptions"
        CreateTableBody={SubscriptionsTable}
        TABLEDATA={ACTIVESUBSCRIPTIONS}
        TABLEHEADERS={TABLEHEADERS}
      />
      <Panel
        containerClassName="inactive-panel"
        initiallyExpanded={true}
        title="Inactive Subscriptions"
        CUSTOMBUTTONS={INACTIVESUBSBUTTONS}
        filterFieldLabel="Filter Inactive Subscriptions"
        filterForm="FilterInactiveSubscriptions"
        CreateTableBody={SubscriptionsTable}
        TABLEDATA={INACTIVESUBSCRIPTIONS}
        TABLEHEADERS={TABLEHEADERS}
      />
    </span>
  )
}

export default SubscriptionsPanels;
