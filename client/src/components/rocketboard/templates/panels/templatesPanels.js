import React from 'react';

import { ACTIVETEMPLATES, TEMPLATEBUTTONS, TABLEHEADERS } from '../fields/templatesFieldsData';
import AddNewTemplate from '../../../../containers/forms/rocketboard/addNewTemplate';
import Panel from '../../app/panels/customPanel';
import TemplateTable from '../tables/templatesForm';

const TemplatesPanels = () => {
  return (
    <span>
      <Panel
        containerClassName="active-panel"
        initiallyExpanded={false}
        title="Create New Template"
        FORM={AddNewTemplate}
      />
      <Panel
        containerClassName="active-panel"
        initiallyExpanded={true}
        title="Templates"
        selectFieldClassName="panel-1"
        SELECTFIELDITEMS={['10', '20', '50', 'All']}
        CUSTOMBUTTONS={TEMPLATEBUTTONS}
        filterFieldLabel="Filter Templates"
        filterForm="FilterTemplates"
        CreateTableBody={TemplateTable}
        TABLEDATA={ACTIVETEMPLATES}
        TABLEHEADERS={TABLEHEADERS}
      />
    </span>
  )
}

export default TemplatesPanels;
