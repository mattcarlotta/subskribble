import * as types from 'types';

const initialTabPanelProps = {
  activeitems: [],
  activeitemcount: 0,
  inactiveitems: [],
  inactiveitemcount: 0,
};

const SubscriberReducer = (state = initialTabPanelProps, { payload, type }) => {
  switch (type) {
    case types.SET_ACTIVE_SUBS:
      return { ...state, activeitems: payload };
    case types.SET_INACTIVE_SUBS:
      return { ...state, inactiveitems: payload };
    case types.SET_INITIAL_SUBS:
      return {
        ...state,
        activeitems: payload.activesubscribers,
        inactiveitems: payload.inactivesubscribers,
      };
    case types.SET_INITIAL_SUBCOUNTS:
      return {
        ...state,
        activeitemcount: payload.activesubscriberscount,
        inactiveitemcount: payload.inactivesubscriberscount,
      };
    default:
      return state;
  }
};

export default SubscriberReducer;
