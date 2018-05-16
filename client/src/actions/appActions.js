import * as types from './types';

const appIsLoading = () => ({ type: types.APP_LOADING_STATE })
const resetServerMessages = () => ({ type: types.RESET_SERVER_MESSAGES })

export {
  appIsLoading,
  resetServerMessages
}
