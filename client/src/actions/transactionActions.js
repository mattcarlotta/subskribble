import { app } from './axiosConfig';
import * as types from './types';

export default {
	// Deletes requested transaction from DB
	deleteAction: id => dispatch => (
		app.delete(`transactions/delete/${id}`)
		.then(({data: {message}}) => {
			dispatch(this.a.fetchItemCounts())
			dispatch(this.a.fetchItems())
			dispatch({ type: types.SERVER_MESSAGE, payload: message })
		})
		.catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
	),
	// Fetches next/prev via sortByNum active/inactive transactions from DB
	fetchAction: (table, page, sortByNum) => dispatch => (
		app.get(`transactions/records?table=${table}&page=${page}&limit=${sortByNum}`)
		.then(({data: {chargetransactions, refundtransactions }}) => {
			chargetransactions && dispatch({ type: types.SET_CHARGES, payload: chargetransactions })
			refundtransactions && dispatch({ type: types.SET_REFUNDS, payload: refundtransactions })
		})
		.catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
	),
	// Fetches initial 10 active/inactive transactions from DB
	fetchItems: () => dispatch => (
		app.get('transactions')
		.then(({data: {chargetransactions, refundtransactions}}) => {
			dispatch({ type: types.SET_INITIAL_TRANSACTIONS, payload: {chargetransactions, refundtransactions}})
		})
		.catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
	),
	// Fetches initial transaction counts from DB
	fetchItemCounts: () => dispatch => (
		app.get('transactioncounts')
		.then(({data: {chargecount, refundcount}}) => {
			dispatch({ type: types.SET_INITIAL_TRANSACTIONCOUNTS, payload: { chargecount, refundcount }})
		})
		.catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
	)
}
