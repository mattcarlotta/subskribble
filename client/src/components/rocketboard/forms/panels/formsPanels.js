import React from 'react';

import { ACTIVEFORMS, FORMBUTTONS, TABLEHEADERS } from '../fields/formsFieldsData';
import AddNewForm from '../../../../containers/forms/rocketboard/addNewForm';
import FormTable from '../tables/formsTable';

import Panel from '../../app/panels/customPanel';

const FormPanels = () => {
  return (
    <span>
      <Panel
        containerClassName="active-panel"
        initiallyExpanded={false}
        title="Create New Form"
        FORM={AddNewForm}
      />
      <Panel
        containerClassName="active-panel"
        initiallyExpanded={true}
        title="Forms"
        CUSTOMBUTTONS={FORMBUTTONS}
        filterFieldLabel="Filter Forms"
        filterForm="FilterForms"
        CreateTableBody={FormTable}
        TABLEDATA={ACTIVEFORMS}
        TABLEHEADERS={TABLEHEADERS}
      />
    </span>
  )
}

export default FormPanels;
