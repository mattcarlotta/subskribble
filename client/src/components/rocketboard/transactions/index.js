import React from 'react';
import TransactionsPanels from './panels/transactionsPanels';
import PanelsContainer from '../app/panels/panelsContainer';

export default function() { return <PanelsContainer Panels={TransactionsPanels} /> }
