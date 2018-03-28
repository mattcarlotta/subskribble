// import React from 'react';
//
// import { ACTIVETEMPLATES, TEMPLATEBUTTONS, TABLEHEADERS } from '../fields/templatesFieldsData';
// import AddNewTemplate from '../../../../containers/forms/rocketboard/addNewTemplate';
// import Panel from '../../app/panels/customPanel';
// import TemplateTable from '../tables/templatesForm';
//
// const TemplatesPanels = () => [
//   <Panel
//     key="newtemplatepanel"
//     containerClassName="active-panel"
//     initiallyExpanded={false}
//     title="Create New Template"
//     FORM={AddNewTemplate}
//   />,
//   <Panel
//     key="templatepanel"
//     containerClassName="active-panel"
//     initiallyExpanded={true}
//     title="Templates"
//     selectFieldClassName="panel-1"
//     SELECTFIELDITEMS={['10', '20', '50', 'All']}
//     CUSTOMBUTTONS={TEMPLATEBUTTONS}
//     filterFieldLabel="Filter Templates"
//     FILTERFORM="FilterTemplates"
//     TABLECONTENTS={TemplateTable(ACTIVETEMPLATES)}
//     TABLEHEADERS={TABLEHEADERS}
//   />
// ]
//
// export default TemplatesPanels;

import React from 'react';
import CARDS from '../layouts/templateLayout';
import BasicPanel from '../../app/panels/basicPanel';
// import AddNewPromo from '../../../../containers/forms/rocketboard/addNewPromo';

export default () => (<BasicPanel title="Templates" CARDS={CARDS} />)
