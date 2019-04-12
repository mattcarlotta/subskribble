import app from 'utils/setup';
import { logout } from 'controllers/auth';

jest.mock('../../../controllers/auth', () => ({
  ...require.requireActual('../../../controllers/auth'),
  logout: jest.fn(),
}));

describe('Logout Session Route', () => {
  it('routes authenticated requests to the logout controller', () => {
    app()
      .post('/api/logout')
      .then(() => {
        expect(logout).toHaveBeenCalledTimes(1);
      });
  });
});
