import * as types from '../types';

const serverInitialState = {
  error: '',
  message: '',
};

const ServerReducer = (state = serverInitialState, { payload, type }) => {
  switch (type) {
    case types.RESET_SERVER_MESSAGES:
      return { ...state, error: '' };
    case types.SERVER_ERROR:
      return { ...state, error: payload };
    case types.SERVER_MESSAGE:
      return { ...state, message: payload };
    default:
      return state;
  }
};

export default ServerReducer;
