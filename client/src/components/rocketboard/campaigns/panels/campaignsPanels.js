import React from 'react';

import { ACTIVECAMPAIGNS, ACTIVECAMPAIGNSBUTTONS, INACTIVECAMPAIGNS, INACTIVECAMPAIGNSBUTTONS, TABLEHEADERS } from '../fields/campaignsFieldsData';

import Panel from '../../app/panels/customPanel';
import AddNewPromo from '../../../../containers/forms/rocketboard/addNewPromo';
import CampaignsTable from '../tables/campaignsTable';

const CampaignsPanels = () => [
  <Panel
    key="newpromocodepanel"
    containerClassName="active-panel"
    initiallyExpanded={false}
    title="Add Promo Code"
    FORM={AddNewPromo}
  />,
  <Panel
    key="activecampaignspanel"
    containerClassName="active-panel"
    initiallyExpanded={true}
    title="Active Campaigns"
    selectFieldClassName="panel-1"
    SELECTFIELDITEMS={['10', '20', '50', 'All']}
    CUSTOMBUTTONS={ACTIVECAMPAIGNSBUTTONS}
    filterFieldLabel="Filter Active Promo Codes"
    FILTERFORM="FilterActivePromoCodes"
    TABLECONTENTS={() => CampaignsTable(ACTIVECAMPAIGNS)}
    TABLEHEADERS={TABLEHEADERS}
  />,
  <Panel
    key="inactivecampaignspanel"
    containerClassName="inactive-panel"
    initiallyExpanded={true}
    title="Inactive Campaigns"
    selectFieldClassName="panel-1"
    SELECTFIELDITEMS={['10', '20', '50', 'All']}
    CUSTOMBUTTONS={INACTIVECAMPAIGNSBUTTONS}
    filterFieldLabel="Filter Inactive Promo Codes"
    FILTERFORM="FilterInactivePromoCodes"
    TABLECONTENTS={() => CampaignsTable(INACTIVECAMPAIGNS)}
    TABLEHEADERS={TABLEHEADERS}
  />
]

export default CampaignsPanels;
