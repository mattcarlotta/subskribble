import React from 'react';
import CARDS from '../layouts/panelCards';
import TabPanel from '../../app/panels/tabPanel';

export default () => (<TabPanel key="plans-panel" TABS={['Active Plans', 'Inactive Plans']} CARDS={CARDS} />)
