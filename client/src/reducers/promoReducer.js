import * as types from '../types';

const initialTabPanelProps = {
  activeitems: [],
  activeitemcount: 0,
  inactiveitems: [],
  inactiveitemcount: 0,
};

const PromoReducer = (state = initialTabPanelProps, { payload, type }) => {
  switch (type) {
    case types.APPLY_PROMO_CODE:
      return { ...state, appliedPromoCode: payload };
    case types.SET_ACTIVE_PROMOS:
      return { ...state, activeitems: payload };
    case types.SET_INACTIVE_PROMOS:
      return { ...state, inactiveitems: payload };
    case types.SET_INITIAL_PROMOS:
      return {
        ...state,
        activeitems: payload.activepromos,
        inactiveitems: payload.inactivepromos,
      };
    case types.SET_INITIAL_PROMOCOUNTS:
      return {
        ...state,
        activeitemcount: payload.activepromocount,
        inactiveitemcount: payload.inactivepromocount,
      };
    default:
      return state;
  }
};

export default PromoReducer;
