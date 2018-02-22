import { ACTIVEPLANS, INACTIVEPLANS, TABLEHEADERS } from '../fields/plansFieldsData';

export default [
  {
    FILTERFIELDLABEL: "Filter Active Plans",
    FILTERFORM: "FilterActivePlans",
    SELECTFIELDITEMS: ['10', '20', '50', 'All'],
    TAB: "Active Plans",
    TABLECONTENTS: ACTIVEPLANS,
    TABLEHEADERS: TABLEHEADERS
  },
  {
    FILTERFIELDLABEL: "Filter Inactive Plans",
    FILTERFORM: "FilterInactivePlans",
    SELECTFIELDITEMS: ['10', '20', '50', 'All'],
    TAB: "Inactive Plans",
    TABLECONTENTS: INACTIVEPLANS,
    TABLEHEADERS: TABLEHEADERS
  }
];
