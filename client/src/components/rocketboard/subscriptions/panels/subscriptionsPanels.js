import React from 'react';

import { ACTIVESUBSCRIPTIONS, ACTIVESUBSBUTTONS, INACTIVESUBSCRIPTIONS, INACTIVESUBSBUTTONS, TABLEHEADERS } from '../fields/subscriptionsFieldsData';

import SubscriptionsTable from '../tables/subscriptionsTable';
import Panel from '../../app/panels/customPanel';

const SubscriptionsPanels = () => [
  <Panel
    key="activesubscriptionspanel"
    containerClassName="active-panel"
    initiallyExpanded={true}
    title="Active Subscriptions"
    selectFieldClassName="panel-1"
    SELECTFIELDITEMS={['10', '20', '50', 'All']}
    CUSTOMBUTTONS={ACTIVESUBSBUTTONS}
    filterFieldLabel="Filter Active Subscriptions"
    FILTERFORM="FilterActiveSubscriptions"
    TABLECONTENTS={() => SubscriptionsTable(ACTIVESUBSCRIPTIONS)}
    TABLEHEADERS={TABLEHEADERS}
  />,
  <Panel
    key="inactivesubscriptionspanel"
    containerClassName="inactive-panel"
    initiallyExpanded={true}
    title="Inactive Subscriptions"
    selectFieldClassName="panel-1"
    SELECTFIELDITEMS={['10', '20', '50', 'All']}
    CUSTOMBUTTONS={INACTIVESUBSBUTTONS}
    filterFieldLabel="Filter Inactive Subscriptions"
    FILTERFORM="FilterInactiveSubscriptions"
    TABLECONTENTS={() => SubscriptionsTable(INACTIVESUBSCRIPTIONS)}
    TABLEHEADERS={TABLEHEADERS}
  />
]

export default SubscriptionsPanels;
