import app from 'utils/setup';
import { login } from 'controllers/auth';

jest.mock('../../../controllers/auth', () => ({
  ...require.requireActual('../../../controllers/auth'),
  login: jest.fn(),
}));

describe('Login Route', () => {
  it('routes requests to the login controller', () => {
    app()
      .post('/api/signin')
      .then(() => {
        expect(login).toHaveBeenCalledTimes(1);
      });
  });
});
