import { CHARGES, CHARGESTABLEHEADERS, REFUNDS, REFUNDSTABLEHEADERS } from '../fields/transactionsFieldsData';

export default [
  {
    FILTERFIELDLABEL: "Filter Charges",
    FILTERFORM: "FilterCharges",
    SELECTFIELDITEMS: ['10', '20', '50', 'All'],
    TAB: "Charges",
    TABLECONTENTS: CHARGES,
    TABLEHEADERS: CHARGESTABLEHEADERS
  },
  {
    FILTERFIELDLABEL: "Filter Refunds",
    FILTERFORM: "FilterRefunds",
    SELECTFIELDITEMS: ['10', '20', '50', 'All'],
    TAB: "Refunds",
    TABLECONTENTS: REFUNDS,
    TABLEHEADERS: REFUNDSTABLEHEADERS
  }
]
