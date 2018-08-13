import React from 'react';
import { connect } from 'react-redux';
import actions from '../../../actions/transactionActions';
import CARDS from '../../../components/subskribble/transactions/layouts/panelCards';
import PanelLoader from '../../../components/subskribble/app/panels/PanelLoader';
import TransactionsPanel from '../../../components/subskribble/transactions/panels/transactionsPanels';

const Transactions = props => (
  <PanelLoader
    cardTitle="Transactions"
    CARDS={CARDS}
    Panel={TransactionsPanel}
    {...props}
  />
);

export default connect(state => ({ serverMessage: state.server.message, ...state.transactions }), { ...actions })(Transactions)
