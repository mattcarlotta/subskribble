import { app } from '../utils';
import * as types from '../types';
import { fetchNotifications } from './notificationActions';

// Fetches initial 10 active/inactive plans from DB
const fetchItems = () => dispatch =>
  app
    .get('plans')
    .then(({ data: { activeplans, inactiveplans } }) =>
      dispatch({
        type: types.SET_INITIAL_PLANS,
        payload: { activeplans, inactiveplans },
      }),
    )
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }));

// Fetches initial subscribers counts from DB
const fetchItemCounts = () => dispatch =>
  app
    .get('plancounts')
    .then(({ data: { activeplancount, inactiveplancount } }) =>
      dispatch({
        type: types.SET_INITIAL_PLANCOUNTS,
        payload: { activeplancount, inactiveplancount },
      }),
    )
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }));

// Deletes requested plan from DB
const deleteAction = id => dispatch =>
  app
    .delete(`plans/delete/${id}`)
    .then(() => {
      dispatch(fetchItemCounts());
      dispatch(fetchItems());
      dispatch(fetchNotifications());
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }));

// Fetches next/prev via sortByNum active/inactive plans from DB
const fetchAction = (table, page, sortByNum) => dispatch =>
  app
    .get(`plans/records?table=${table}&page=${page}&limit=${sortByNum}`)
    .then(({ data: { activeplans, inactiveplans } }) => {
      if (activeplans)
        dispatch({ type: types.SET_ACTIVE_PLANS, payload: activeplans });
      if (inactiveplans)
        dispatch({ type: types.SET_INACTIVE_PLANS, payload: inactiveplans });
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }));

// fetch all active plans
const fetchAllActivePlans = () => dispatch =>
  app
    .get(`plans/only-active`)
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }));

// Fetches a plan for editing
const fetchPlan = id => dispatch =>
  app
    .get(`plans/plan?id=${id}`)
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }));

// Sets plan status to active or suspended
const updateAction = (updateType, statusType, id) => dispatch =>
  app
    .put(`plans/update/${id}`, { statusType, updateType })
    .then(() => {
      dispatch(fetchItemCounts());
      dispatch(fetchItems());
      dispatch(fetchNotifications());
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }));

export {
  deleteAction,
  fetchAction,
  fetchAllActivePlans,
  fetchItems,
  fetchItemCounts,
  fetchPlan,
  updateAction,
};
