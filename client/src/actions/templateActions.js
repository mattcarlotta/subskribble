import { app } from '../utils';
import * as types from '../types';
import { fetchNotifications } from './notificationActions';

// Fetches initial 10 active/inactive templates from DB
const fetchItems = () => dispatch =>
  app
    .get('templates')
    .then(({ data: { activetemplates, inactivetemplates } }) =>
      dispatch({
        type: types.SET_INITIAL_TEMPLATES,
        payload: { activetemplates, inactivetemplates },
      }),
    )
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }));

// Fetches initial templates counts from DB
const fetchItemCounts = () => dispatch =>
  app
    .get('templatecounts')
    .then(({ data: { activetemplatescount, inactivetemplatescount } }) =>
      dispatch({
        type: types.SET_INITIAL_TEMPLATECOUNTS,
        payload: { activetemplatescount, inactivetemplatescount },
      }),
    )
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }));

// Deletes requested template from DB
const deleteAction = id => dispatch =>
  app
    .delete(`templates/delete/${id}`)
    .then(() => {
      dispatch(fetchItemCounts());
      dispatch(fetchItems());
      dispatch(fetchNotifications());
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }));

// Fetches next/prev via sortByNum active/inactive subs from DB
const fetchAction = (table, page, sortByNum) => dispatch =>
  app
    .get(`templates/records?table=${table}&page=${page}&limit=${sortByNum}`)
    .then(({ data: { activetemplates, inactivetemplates } }) => {
      if (activetemplates)
        dispatch({
          type: types.SET_ACTIVE_TEMPLATES,
          payload: activetemplates,
        });
      if (inactivetemplates)
        dispatch({
          type: types.SET_INACTIVE_TEMPLATES,
          payload: inactivetemplates,
        });
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }));

// fetch all active templates
const fetchAllActiveTemplates = () => dispatch =>
  app
    .get(`templates/only-active`)
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }));

// Fetches a template for editing
const fetchTemplate = id => dispatch =>
  app
    .get(`templates/template?id=${id}`)
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }));

// Sets templates status to active or suspended
const updateAction = (updateType, statusType, id) => dispatch =>
  app
    .put(`templates/status/${id}`, { statusType, updateType })
    .then(() => {
      dispatch(fetchItemCounts());
      dispatch(fetchItems());
      dispatch(fetchNotifications());
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }));

export {
  deleteAction,
  fetchAction,
  fetchAllActiveTemplates,
  fetchItems,
  fetchItemCounts,
  fetchTemplate,
  updateAction,
};
