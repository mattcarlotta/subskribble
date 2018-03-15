import app from './axiosConfig';
import {
  SERVER_ERROR,
  SET_INITIAL_SUBS,
  SET_INITIAL_SUBCOUNTS,
  SET_ACTIVE_SUBS,
  // SET_ACTIVE_SUBS_COUNT,
  SET_INACTIVE_SUBS,
  // SET_INACTIVE_SUBS_COUNT,
} from './types';

app.interceptors.response.use(response => (response), error => (Promise.reject(error.response.data.err)))

// Fetches next/prev via sortByNum active subs from DB
const fetchNextActiveSubscribers = (table, page, sortByNum) => dispatch => (
  app.get(`subscribers/records?table=${table}&page=${page}&sortByNum=${sortByNum}`)
  .then(({data: {activesubscribers, inactivesubscribers }}) => {
    activesubscribers && dispatch({ type: SET_ACTIVE_SUBS, payload: activesubscribers })
    inactivesubscribers && dispatch({ type: SET_INACTIVE_SUBS, payload: inactivesubscribers })
  })
  .catch(err => dispatch({ type: SERVER_ERROR, payload: err }))
)


// Fetches initial 10 active/inactive subscribers from DB
const fetchSubscribers = () => dispatch => (
  app.get('subscribers')
  .then(({data: {activesubscribers, inactivesubscribers}}) => {
    dispatch({ type: SET_INITIAL_SUBS, payload: {activesubscribers, inactivesubscribers}})
  })
  .catch(err => dispatch({ type: SERVER_ERROR, payload: err }))
)

// Fetches initial subscribers counts from DB
const fetchSubscriberCounts = () => dispatch => (
  app.get('subscribercounts')
  .then(({data: {activesubscriberscount, inactivesubscriberscount}}) => {
    dispatch({ type: SET_INITIAL_SUBCOUNTS, payload: { activesubscriberscount, inactivesubscriberscount }})
  })
  .catch(err => dispatch({ type: SERVER_ERROR, payload: err }))
)

export {
  fetchNextActiveSubscribers,
  fetchSubscribers,
  fetchSubscriberCounts
}
