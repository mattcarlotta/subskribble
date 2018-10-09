import { app } from './axiosConfig';
import * as types from './types';
import { fetchNotifications } from './notificationActions';

// Fetches initial 10 messages from DB
const fetchItems = () => dispatch =>
  app
    .get('messages')
    .then(({ data: { messages } }) =>
      dispatch({ type: types.SET_INITIAL_MESSAGES, payload: { messages } }),
    )
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }));

// Fetches initial message counts from DB
const fetchItemCounts = () => dispatch =>
  app
    .get('messagecounts')
    .then(({ data: { messagecounts } }) =>
      dispatch({
        type: types.SET_INITIAL_MESSAGECOUNTS,
        payload: messagecounts,
      }),
    )
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }));

// Deletes requested message from DB
const deleteAction = id => dispatch =>
  app
    .delete(`messages/delete/${id}`)
    .then(() => {
      dispatch(fetchItemCounts());
      dispatch(fetchItems());
      dispatch(fetchNotifications());
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }));

// Fetches next/prev via sortByNum messages from DB
const fetchAction = (table, page, sortByNum) => dispatch =>
  app
    .get(`messages/records?table=${table}&page=${page}&limit=${sortByNum}`)
    .then(({ data: { messages } }) => {
      if (messages) dispatch({ type: types.SET_MESSAGES, payload: messages });
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }));

export { deleteAction, fetchAction, fetchItems, fetchItemCounts };