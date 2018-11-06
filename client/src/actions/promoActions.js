import { app } from '../utils';
import * as types from '../types';
import { fetchNotifications } from './notificationActions';

// Fetches initial promotionals counts from DB
const fetchItems = () => dispatch =>
  app
    .get('promotionals')
    .then(({ data: { activepromos, inactivepromos } }) =>
      dispatch({
        type: types.SET_INITIAL_PROMOS,
        payload: { activepromos, inactivepromos },
      }),
    )
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }));

// Fetches initial promotionals counts from DB
const fetchItemCounts = () => dispatch =>
  app
    .get('promotionalcounts')
    .then(({ data: { activepromocount, inactivepromocount } }) =>
      dispatch({
        type: types.SET_INITIAL_PROMOCOUNTS,
        payload: { activepromocount, inactivepromocount },
      }),
    )
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }));

// Deletes requested promotionals from DB
const deleteAction = id => dispatch =>
  app
    .delete(`promotionals/delete/${id}`)
    .then(() => {
      dispatch(fetchItemCounts());
      dispatch(fetchItems());
      dispatch(fetchNotifications());
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }));

// Fetches next/prev via sortByNum active/inactive promos from DB
const fetchAction = (table, page, sortByNum) => dispatch =>
  app
    .get(`promotionals/records?table=${table}&page=${page}&limit=${sortByNum}`)
    .then(({ data: { activepromos, inactivepromos } }) => {
      if (activepromos)
        dispatch({ type: types.SET_ACTIVE_PROMOS, payload: activepromos });
      if (inactivepromos)
        dispatch({ type: types.SET_INACTIVE_PROMOS, payload: inactivepromos });
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }));

// Fetches a promo for editing
const fetchPromo = id => dispatch =>
  app
    .get(`promotionals/promotional?id=${id}`)
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }));

// Sets promotionals status to active or suspended
const updateAction = (updateType, statusType, userid) => dispatch =>
  app
    .put(`promotionals/update/${userid}`, { statusType, updateType })
    .then(() => {
      dispatch(fetchItemCounts());
      dispatch(fetchItems());
      dispatch(fetchNotifications());
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }));

export {
  deleteAction,
  fetchAction,
  fetchItems,
  fetchItemCounts,
  fetchPromo,
  updateAction,
};
