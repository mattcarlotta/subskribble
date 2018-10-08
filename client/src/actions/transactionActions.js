import { browserHistory } from 'react-router';
import { app } from './axiosConfig';
import * as types from './types';
import { fetchNotifications } from './notificationActions';

// Fetches initial 10 active/inactive transactions from DB
const fetchItems = () => dispatch =>
  app
    .get('transactions')
    .then(({ data: { chargetransactions, refundtransactions } }) =>
      dispatch({
        type: types.SET_INITIAL_TRANSACTIONS,
        payload: { chargetransactions, refundtransactions },
      }),
    )
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }));

// Fetches initial transaction counts from DB
const fetchItemCounts = () => dispatch =>
  app
    .get('transactioncounts')
    .then(({ data: { chargecount, refundcount } }) =>
      dispatch({
        type: types.SET_INITIAL_TRANSACTIONCOUNTS,
        payload: { chargecount, refundcount },
      }),
    )
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }));

// Deletes requested transaction from DB
const deleteAction = id => dispatch =>
  app
    .delete(`transactions/delete/${id}`)
    .then(() => {
      dispatch(fetchItemCounts());
      dispatch(fetchItems());
      dispatch(fetchNotifications());
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }));

// Fetches next/prev via sortByNum active/inactive transactions from DB
const fetchAction = (table, page, sortByNum) => dispatch =>
  app
    .get(`transactions/records?table=${table}&page=${page}&limit=${sortByNum}`)
    .then(({ data: { chargetransactions, refundtransactions } }) => {
      if (chargetransactions)
        dispatch({ type: types.SET_CHARGES, payload: chargetransactions });
      if (refundtransactions)
        dispatch({ type: types.SET_REFUNDS, payload: refundtransactions });
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }));

// Fetches a single transaction record from DB
const fetchTransaction = id => dispatch =>
  app
    .get(`transaction/record?id=${id}`)
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }));

// Refunds or credits a transaction
const refundAction = formProps => dispatch =>
  app
    .post('transaction/refund', { ...formProps })
    .then(() => {
      dispatch(fetchNotifications());
      browserHistory.push('/subskribble/transactions');
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }));

export {
  deleteAction,
  fetchAction,
  fetchItems,
  fetchItemCounts,
  fetchTransaction,
  refundAction,
};
