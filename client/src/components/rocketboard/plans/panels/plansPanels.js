import React from 'react';

import { ACTIVEPLANS, ACTIVEPANELBUTTONS, INACTIVEPLANS, INACTIVEPANELBUTTONS, TABLEHEADERS } from '../fields/plansFieldsData';

import PlansTable from '../tables/plansTable';
import Panel from '../../app/panels/customPanel';

const PlansPanels = () => {
  return(
    <span>
      <Panel
        containerClassName="active-panel"
        initiallyExpanded={true}
        title="Active Plans"
        selectFieldClassName="panel-1"
        selectFieldLabel="Sort By"
        SELECTFIELDITEMS={['10', '20', '50', 'All']}
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
        selectFieldClassName="panel-1"
        selectFieldLabel="Sort By"
        SELECTFIELDITEMS={['10', '20', '50', 'All']}
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
