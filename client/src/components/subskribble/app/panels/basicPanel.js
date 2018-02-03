import React from 'react';
import { Card } from 'antd';

// import FilterField from '../../app/formFields/FilterField';
// import RenderPanelButtons from './renderPanelButtons';
// import SelectField from '../../app/formFields/selectField';
// import TableList from '../../app/tables/TableList';

const BasicPanel = ({
  buttonPanel,
  containerClassName,
  CARDBODY,
  title,
  visible
}) => {
  const display = visible ? "" : "none";
  return (
    <div className={containerClassName}>
      <div className="panel-container">
        <Card title={title} extra={buttonPanel(visible)}>
         <div className="panel-body-container">
           <div className="panel-body" style={{ display }}>
              { CARDBODY && <CARDBODY /> }
           </div>
         </div>
        </Card>
      </div>
    </div>
  )
}

/*
containerClassName,
title,
CUSTOMBUTTONS,
selectFieldClassName,
SELECTFIELDITEMS,
FORM,
CARDBODY,
GRAPH,
filterFieldLabel,
FILTERFORM,
TABLECONTENTS,
TABLEHEADERS
*/

// const CustomPanel = ({
//   containerClassName,
//   initiallyExpanded,
//   title,
//   CUSTOMBUTTONS,
//   selectFieldClassName,
//   SELECTFIELDITEMS,
//   FORM,
//   CARDBODY,
//   GRAPH,
//   filterFieldLabel,
//   FILTERFORM,
//   TABLECONTENTS,
//   TABLEHEADERS
// }) => {
//   return (
//     <div className={containerClassName}>
//       <div className="panel-container">
//         <Card
//           containerStyle={{ paddingBottom: 0 }}
//           style={{ boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px' }}
//           initiallyExpanded={initiallyExpanded}
//           >
//             <CardHeader
//               style={{ borderBottom: '1px solid rgba(120, 130, 140, 0.13)', fontFamily: 'Poppins Medium, sans-serif', backgroundColor: '#fff' }}
//               title={title}
//               titleColor="#8f979f"
//               iconStyle={{ color: '#8f979f' }}
//               closeIcon={<FontIcon className="material-icons">add</FontIcon>}
//               openIcon={<FontIcon className="material-icons">remove</FontIcon>}
//               actAsExpander={true}
//               showExpandableButton={true}
//             />
//             <CardText
//               expandable={true}
//               style={{ padding: "0px 16px" }}
//               >
//                 { FORM && <FORM /> }
//                 { CARDBODY && <CARDBODY /> }
//               <div className="panel-body">
//                 { SELECTFIELDITEMS && <SelectField className={selectFieldClassName} floatingLabelText="Sort By" MENUITEMS={SELECTFIELDITEMS} /> }
//                 <div className="panel-6">
//                   { CUSTOMBUTTONS && <RenderPanelButtons CUSTOMBUTTONS={CUSTOMBUTTONS}/> }
//                 </div>
//                 { GRAPH && <GRAPH /> }
//                 { FILTERFORM && <FilterField className="panel-4" floatingLabelText={filterFieldLabel} form={FILTERFORM} /> }
//                 { TABLECONTENTS && <TableList TABLECONTENTS={TABLECONTENTS} TABLEHEADERS={TABLEHEADERS} /> }
//               </div>
//             </CardText>
//           </Card>
//         </div>
//     </div>
//   )
// }

export default BasicPanel;
