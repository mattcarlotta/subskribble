import React from 'react';
import CARDS from '../layouts/panelCards';
import TabPanel from '../../app/panels/tabPanel';
// import AddNewPromo from '../../../../containers/forms/rocketboard/addNewPromo';

export default () => (<TabPanel key="promos-panel"  TABS={['Active Promotionals', 'Inactive Promotionals']} CARDS={CARDS} />)
