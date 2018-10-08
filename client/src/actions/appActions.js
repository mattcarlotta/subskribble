import * as types from './types';

const resetServerMessages = () => ({ type: types.RESET_SERVER_MESSAGES });
const serverErrorMessage = err => ({ type: types.SERVER_ERROR, payload: err });

export { resetServerMessages, serverErrorMessage };
