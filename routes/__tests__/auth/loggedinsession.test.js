import app from 'utils/setup';
import { loggedin } from 'controllers/auth';
import { requireRelogin } from 'strategies';

jest.mock('../../../controllers/auth', () => ({
  ...require.requireActual('../../../controllers/auth'),
  loggedin: jest.fn(),
}));

jest.mock('../../../services/strategies/requireRelogin', () => jest.fn());

describe('Loggedin Session Route', () => {
  afterEach(() => {
    requireRelogin.mockClear();
    loggedin.mockClear();
  });

  it('routes initial requests to authentication middleware', () => {
    app()
      .get('/api/loggedin')
      .then(() => {
        expect(requireRelogin).toHaveBeenCalledTimes(1);
      });
  });

  it('routes authenticated requests to the loggedin controller', () => {
    app()
      .get('/api/loggedin')
      .then(() => {
        expect(loggedin).toHaveBeenCalledTimes(1);
      });
  });
});
