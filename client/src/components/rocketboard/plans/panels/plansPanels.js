import React from 'react';

import { ACTIVEPLANS, ACTIVEPANELBUTTONS, TABLEHEADERS } from '../fields/plansFieldsData';
import { INACTIVEPLANS, INACTIVEPANELBUTTONS } from '../fields/plansFieldsData';

import PlansTable from '../tables/plansTable';
import Panel from '../../app/panels/customPanel';

const PlansPanels = () => {
  return(
    <span>
      <Panel
        containerClassName="active-panel"
        initiallyExpanded={true}
        title="Active Plans"
        CUSTOMBUTTONS={ACTIVEPANELBUTTONS}
        filterFieldLabel="Filter Active Plans"
        filterForm="FilterActivePlans"
        CreateTableBody={PlansTable}
        TABLEDATA={ACTIVEPLANS}
        TABLEHEADERS={TABLEHEADERS}
      />
      <Panel
        containerClassName="inactive-panel"
        initiallyExpanded={true}
        title="Inactive Plans"
        CUSTOMBUTTONS={INACTIVEPANELBUTTONS}
        filterFieldLabel="Filter Inactive Plans"
        filterForm="FilterInactivePlans"
        CreateTableBody={PlansTable}
        TABLEDATA={INACTIVEPLANS}
        TABLEHEADERS={TABLEHEADERS}
      />
    </span>
  )
}

export default PlansPanels;
