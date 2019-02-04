import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/transactionActions.js';
import CARDS from '../../components/transactions/layouts/PanelCards/panelCards.js';
import PanelLoader from '../../components/app/panels/PanelLoader/PanelLoader.js';

const Transactions = props => (
  <PanelLoader
    {...props}
    cardTitle="Transactions"
    CARDS={CARDS}
    panelType="tab"
  />
);

export default connect(
  state => ({
    serverError: state.server.error,
    serverMessage: state.server.message,
    ...state.transactions,
  }),
  { ...actions },
)(Transactions);
