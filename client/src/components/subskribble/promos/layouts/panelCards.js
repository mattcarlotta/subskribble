import { ACTIVECAMPAIGNS, INACTIVECAMPAIGNS, TABLEHEADERS } from '../fields/promosFieldsData';

/*
<Panel
  key="newpromocodepanel"
  containerClassName="active-panel"
  initiallyExpanded={false}
  title="Add Promo Code"
  FORM={AddNewPromo}
/>
*/

export default [
  {
    FILTERFIELDLABEL: "Filter Active Promotionals",
    FILTERFORM: "FilterActivePromos",
    SELECTFIELDITEMS: ['10', '20', '50', 'All'],
    TAB: "Active Promotionals",
    TABLECONTENTS: ACTIVECAMPAIGNS,
    TABLEHEADERS: TABLEHEADERS
  },
  {
    FILTERFIELDLABEL: "Filter Inactive Promotionals",
    FILTERFORM: "FilterInactivePlans",
    SELECTFIELDITEMS: ['10', '20', '50', 'All'],
    TAB: "Inactive Promotionals",
    TABLECONTENTS: INACTIVECAMPAIGNS,
    TABLEHEADERS: TABLEHEADERS
  }
]
