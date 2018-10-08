import React from 'react';
import BasicPanel from '../../app/panels/basicPanel';
import PageContainer from '../../app/panels/pageContainer';

export default ({ CARDS, ...rest }) => (
  <PageContainer>
    <BasicPanel {...rest} CARDS={CARDS} />
  </PageContainer>
);
