import * as types from 'types';

const DashboardReducer = (state = {}, { payload, type }) => {
  switch (type) {
    case types.SET_DASHBOARD_DATA:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export default DashboardReducer;
