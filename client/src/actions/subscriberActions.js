import { app } from '../utils';
import * as types from '../types';
import { fetchNotifications } from './notificationActions';

// Fetches initial 10 active/inactive subscribers from DB
const fetchItems = () => dispatch =>
  app
    .get('subscribers')
    .then(({ data: { activesubscribers, inactivesubscribers } }) => {
      dispatch({
        type: types.SET_INITIAL_SUBS,
        payload: { activesubscribers, inactivesubscribers },
      });
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }));

// Fetches initial subscribers counts from DB
const fetchItemCounts = () => dispatch =>
  app
    .get('subscribercounts')
    .then(({ data: { activesubscriberscount, inactivesubscriberscount } }) => {
      dispatch({
        type: types.SET_INITIAL_SUBCOUNTS,
        payload: { activesubscriberscount, inactivesubscriberscount },
      });
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }));

// Deletes requested subscriber from DB
const deleteAction = (subscriberid, planName) => dispatch =>
  app
    .delete(
      `subscribers/delete?subscriberid=${subscriberid}&planname=${planName}`,
    )
    .then(() => {
      dispatch(fetchItemCounts());
      dispatch(fetchItems());
      dispatch(fetchNotifications());
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }));

// Fetches next/prev via sortByNum active/inactive subs from DB
const fetchAction = (table, page, sortByNum) => dispatch =>
  app
    .get(`subscribers/records?table=${table}&page=${page}&limit=${sortByNum}`)
    .then(({ data: { activesubscribers, inactivesubscribers } }) => {
      if (activesubscribers)
        dispatch({ type: types.SET_ACTIVE_SUBS, payload: activesubscribers });
      if (inactivesubscribers)
        dispatch({
          type: types.SET_INACTIVE_SUBS,
          payload: inactivesubscribers,
        });
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }));

// Sets subscribers status to active or suspended
const updateAction = (updateType, statusType, subscriberid) => dispatch =>
  app
    .put(`subscribers/update/${subscriberid}`, { statusType, updateType })
    .then(() => {
      dispatch(fetchItemCounts());
      dispatch(fetchItems());
      dispatch(fetchNotifications());
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }));

export { deleteAction, fetchAction, fetchItems, fetchItemCounts, updateAction };
