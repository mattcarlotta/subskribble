import React from 'react';

import TransactionsChargesPanel from './panels/transactionsChargesPanel';
import TranscationsRefundsPanel from './panels/transactionsRefundsPanel';


const Transactions = () => {
	return (
		<div className="transactions-container">
			<TransactionsChargesPanel />
			<TranscationsRefundsPanel />
		</div>
	);
};

export default Transactions;
