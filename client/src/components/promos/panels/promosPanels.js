import React from 'react';
import PropTypes from 'prop-types';
import TabPanel from '../../app/panels/tabPanel';
import PageContainer from '../../app/panels/pageContainer';

const PromotionalPanels = ({ CARDS }) => (
  <PageContainer>
    <TabPanel CARDS={CARDS} />
  </PageContainer>
);

export default PromotionalPanels;

PromotionalPanels.propTypes = {
  CARDS: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};