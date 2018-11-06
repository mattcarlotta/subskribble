import { app } from '../utils';
import * as types from '../types';

const getDashboardData = () => dispatch =>
  app
    .get(`dashboard`)
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }));

export { getDashboardData };
