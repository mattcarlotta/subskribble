import * as types from 'types';

const initialTabPanelProps = {
  activeitems: [],
  activeitemcount: 0,
  inactiveitems: [],
  inactiveitemcount: 0,
};

const PlanReducer = (state = initialTabPanelProps, { payload, type }) => {
  switch (type) {
    case types.SET_ACTIVE_PLANS:
      return { ...state, activeitems: payload };
    case types.SET_INACTIVE_PLANS:
      return { ...state, inactiveitems: payload };
    case types.SET_INITIAL_PLANS:
      return {
        ...state,
        activeitems: payload.activeplans,
        inactiveitems: payload.inactiveplans,
      };
    case types.SET_INITIAL_PLANCOUNTS:
      return {
        ...state,
        activeitemcount: payload.activeplancount,
        inactiveitemcount: payload.inactiveplancount,
      };
    default:
      return state;
  }
};

export default PlanReducer;
