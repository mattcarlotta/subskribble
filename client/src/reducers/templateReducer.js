import * as types from '../types';

const initialTabPanelProps = {
  activeitems: [],
  activeitemcount: 0,
  inactiveitems: [],
  inactiveitemcount: 0,
};

const TemplateReducer = (state = initialTabPanelProps, { payload, type }) => {
  switch (type) {
    case types.SET_ACTIVE_TEMPLATES:
      return { ...state, activeitems: payload };
    case types.SET_INACTIVE_TEMPLATES:
      return { ...state, inactiveitems: payload };
    case types.SET_INITIAL_TEMPLATES:
      return {
        ...state,
        activeitems: payload.activetemplates,
        inactiveitems: payload.inactivetemplates,
      };
    case types.SET_INITIAL_TEMPLATECOUNTS:
      return {
        ...state,
        activeitemcount: payload.activetemplatescount,
        inactiveitemcount: payload.inactivetemplatescount,
      };
    default:
      return state;
  }
};

export default TemplateReducer;
