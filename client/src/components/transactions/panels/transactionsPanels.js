import React from 'react';
import PropTypes from 'prop-types';
import TabPanel from '../../app/panels/TabPanel/tabPanel';
import PageContainer from '../../app/panels/PageContainer/pageContainer';

const TransactionPanel = ({ CARDS }) => (
  <PageContainer>
    <TabPanel CARDS={CARDS} />
  </PageContainer>
);

export default TransactionPanel;

TransactionPanel.propTypes = {
  CARDS: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};
