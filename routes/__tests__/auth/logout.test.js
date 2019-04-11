import app from 'utils/setup';
import { logout } from 'controllers/auth';

jest.mock('../../../controllers/auth', () => ({
  ...require.requireActual('../../../controllers/auth'),
  logout: jest.fn((req, res, done) => done()),
}));

describe('Logout Session Route', () => {
  afterEach(() => {
    logout.mockClear();
  });

  afterAll(() => {
    logout.mockRestore();
  });

  it('routes authenticated requests to the logout controller', async () => {
    await app()
      .post('/api/logout')
      .then(() => {
        expect(logout).toHaveBeenCalledTimes(1);
      });
  });
});
