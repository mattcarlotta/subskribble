import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/transactionActions';
import CARDS from '../../components/transactions/layouts/PanelCards/panelCards';
import PanelLoader from '../../components/app/panels/PanelLoader/PanelLoader';
import TransactionsPanel from '../../components/transactions/panels/transactionsPanels';

const Transactions = props => (
  <PanelLoader
    cardTitle="Transactions"
    CARDS={CARDS}
    Panel={TransactionsPanel}
    {...props}
  />
);

export default connect(
  state => ({ serverMessage: state.server.message, ...state.transactions }),
  { ...actions },
)(Transactions);
