import { app } from 'utils';
import * as types from 'types';
import { fetchNotifications } from 'actions/notificationActions';

// Fetches initial 10 messages from DB
const fetchItems = () => dispatch =>
  app
    .get('messages')
    .then(({ data }) =>
      dispatch({
        type: types.SET_INITIAL_MESSAGES,
        payload: { messages: data.messages },
      }),
    )
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }));

// Fetches initial message counts from DB
const fetchItemCounts = () => dispatch =>
  app
    .get('messagecounts')
    .then(({ data }) =>
      dispatch({
        type: types.SET_INITIAL_MESSAGECOUNTS,
        payload: data.messagecounts,
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
    .then(({ data }) => {
      if (data && data.messages)
        dispatch({ type: types.SET_MESSAGES, payload: data.messages });
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }));

export { deleteAction, fetchAction, fetchItems, fetchItemCounts };
