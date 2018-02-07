import { ACTIVESUBSCRIPTIONS, INACTIVESUBSCRIPTIONS, TABLEHEADERS } from '../fields/subscriptionsFieldsData';

export default [
  {
    FILTERFIELDLABEL: "Filter Active Subscriptions",
    FILTERFORM: "FilterActiveSubscriptions",
    SELECTFIELDITEMS: ['10', '20', '50', 'All'],
    TAB: "Active Subscribers",
    TABLECONTENTS: ACTIVESUBSCRIPTIONS,
    TABLEHEADERS: TABLEHEADERS
  },
  {
    FILTERFIELDLABEL: "Filter Inactive Subscriptions",
    FILTERFORM: "FilterInactiveSubscriptions",
    SELECTFIELDITEMS: ['10', '20', '50', 'All'],
    TAB: "Inactive Subscribers",
    TABLECONTENTS: INACTIVESUBSCRIPTIONS,
    TABLEHEADERS: TABLEHEADERS
  }
]
