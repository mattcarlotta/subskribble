import React from 'react';
import TabPanel from '../../app/panels/tabPanel';
import PageContainer from '../../app/panels/pageContainer';

export default ({CARDS}) => (
<PageContainer>
  <TabPanel
    key="customers-plans-panel"
    TABS={['Active Subscribers', 'Inactive Subscribers']}
    CARDS={CARDS}
  />
</PageContainer>
)
