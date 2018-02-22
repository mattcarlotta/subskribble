import React from 'react';
import CARDS from '../layouts/panelCards';
import TabPanel from '../../app/panels/tabPanel';

export default () => (<TabPanel key="customers-plans-panel" TABS={['Active Subscribers', 'Inactive Subscribers']} CARDS={CARDS} />)
