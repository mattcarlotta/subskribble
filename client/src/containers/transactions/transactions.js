import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/transactionActions';
import CARDS from '../../components/transactions/layouts/PanelCards/panelCards';
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
