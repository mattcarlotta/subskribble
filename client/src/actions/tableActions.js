import app from './axiosConfig';
import {
  SERVER_ERROR,
  SET_INTIAL_SUBS,
  SET_ACTIVE_SUBS,
  // SET_ACTIVE_SUBS_COUNT,
  SET_INACTIVE_SUBS,
  // SET_INACTIVE_SUBS_COUNT,
  SET_SORT_BY_NUM
} from './types';

// Fetches next/prev via sortByNum active subs from DB
const fetchNextActiveSubscribers = (table, page, sortByNum) => dispatch => (
  app.get(`subscribers/records?table=${table}&page=${page}&sortByNum=${sortByNum}`)
  .then(({data: {activesubscribers, inactivesubscribers }}) => {
    activesubscribers && dispatch({ type: SET_ACTIVE_SUBS, payload: activesubscribers })
    inactivesubscribers && dispatch({ type: SET_INACTIVE_SUBS, payload: inactivesubscribers })
  })
  .catch(err => dispatch({ SERVER_ERROR, payload: err }))
)


// Fetches initial 10 active/inactive subscribers and counts and from DB
const fetchSubscribers = () => dispatch => (
  app.get('subscribers')
  .then(({data: {activesubscribers, activesubscriberscount, inactivesubscribers, inactivesubscriberscount}}) => {
    dispatch({ type: SET_INTIAL_SUBS, payload: {activesubscribers, activesubscriberscount, inactivesubscribers, inactivesubscriberscount}})
  })
  .catch(err => dispatch({ SERVER_ERROR, payload: err }))
)

// Sets table sortby
const setSortByNum = (num) => ({ type: SET_SORT_BY_NUM, payload: num })

export {
  fetchNextActiveSubscribers,
  fetchSubscribers,
  setSortByNum
}
