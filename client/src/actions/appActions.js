import * as types from './types';

const appIsLoading = () => ({ type: types.APP_LOADING_STATE })
const resetServerMessages = () => ({ type: types.RESET_SERVER_MESSAGES })
const serverErrorMessage = err => ({ type: types.SERVER_ERROR, payload: err })

export {
  appIsLoading,
  resetServerMessages,
  serverErrorMessage
}
