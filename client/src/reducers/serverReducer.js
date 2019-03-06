import * as types from '../types';

const serverInitialState = {
  error: '',
};

const ServerReducer = (state = serverInitialState, { payload, type }) => {
  switch (type) {
    case types.RESET_SERVER_MESSAGES:
      return { ...state, error: '' };
    case types.SERVER_ERROR:
      return { ...state, error: payload };
    default:
      return state;
  }
};

export default ServerReducer;
