import React from 'react';
import BasicPanel from '../../app/panels/BasicPanel/basicPanel';
import PageContainer from '../../app/panels/PageContainer/pageContainer';

export default ({ CARDS, ...rest }) => (
  <PageContainer>
    <BasicPanel {...rest} CARDS={CARDS} />
  </PageContainer>
);
