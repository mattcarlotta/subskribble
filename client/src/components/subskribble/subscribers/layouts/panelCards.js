import { TABLEHEADERS } from '../fields/subscriptionsFieldsData';

export default (subscribers) => {
  return [
    {
      FILTERFIELDLABEL: "Filter Active Subscriptions",
      FILTERFORM: "FilterActiveSubscriptions",
      SELECTFIELDITEMS: ['10', '20', '50', 'All'],
      TAB: "Active Subscribers",
      TABLECONTENTS: subscribers,
      TABLEHEADERS: TABLEHEADERS
    },
    {
      FILTERFIELDLABEL: "Filter Inactive Subscriptions",
      FILTERFORM: "FilterInactiveSubscriptions",
      SELECTFIELDITEMS: ['10', '20', '50', 'All'],
      TAB: "Inactive Subscribers",
      TABLECONTENTS: subscribers,
      TABLEHEADERS: TABLEHEADERS
    }
  ]
}
