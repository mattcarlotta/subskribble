import * as types from 'types';

const initialTabPanelProps = {
  activeitems: [],
  activeitemcount: 0,
  inactiveitems: [],
  inactiveitemcount: 0,
};

const TransactionReducer = (
  state = initialTabPanelProps,
  { payload, type },
) => {
  switch (type) {
    case types.SET_CHARGES:
      return { ...state, activeitems: payload };
    case types.SET_REFUNDS:
      return { ...state, inactiveitems: payload };
    case types.SET_INITIAL_TRANSACTIONS:
      return {
        ...state,
        activeitems: payload.chargetransactions,
        inactiveitems: payload.refundtransactions,
      };
    case types.SET_INITIAL_TRANSACTIONCOUNTS:
      return {
        ...state,
        activeitemcount: payload.chargecount,
        inactiveitemcount: payload.refundcount,
      };
    default:
      return state;
  }
};

export default TransactionReducer;
