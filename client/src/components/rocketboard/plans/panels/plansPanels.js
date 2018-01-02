import React from 'react';

import { ACTIVEPLANS, ACTIVEPANELBUTTONS, INACTIVEPLANS, INACTIVEPANELBUTTONS, TABLEHEADERS } from '../fields/plansFieldsData';
import PlansTable from '../tables/plansTable';
import Panel from '../../app/panels/customPanel';

const PlansPanels = () => [
  <Panel
    key="activeplanspanel"
    containerClassName="active-panel"
    initiallyExpanded={true}
    title="Active Plans"
    selectFieldClassName="panel-1"
    SELECTFIELDITEMS={['10', '20', '50', 'All']}
    CUSTOMBUTTONS={ACTIVEPANELBUTTONS}
    filterFieldLabel="Filter Active Plans"
    FILTERFORM="FilterActivePlans"
    TABLECONTENTS={() => PlansTable(ACTIVEPLANS)}
    TABLEHEADERS={TABLEHEADERS}
  />,
  <Panel
    key="inactiveplanspanel"
    containerClassName="inactive-panel"
    initiallyExpanded={true}
    title="Inactive Plans"
    selectFieldClassName="panel-1"
    SELECTFIELDITEMS={['10', '20', '50', 'All']}
    CUSTOMBUTTONS={INACTIVEPANELBUTTONS}
    filterFieldLabel="Filter Inactive Plans"
    FILTERFORM="FilterInactivePlans"
    TABLECONTENTS={() => PlansTable(INACTIVEPLANS)}
    TABLEHEADERS={TABLEHEADERS}
  />
]

export default PlansPanels;
