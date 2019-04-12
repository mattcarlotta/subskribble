import app from 'utils/setup';
import getAll from 'controllers/dashboard';
import { requireAuth } from 'strategies';

jest.mock('controllers/dashboard', () => jest.fn((req, res, done) => done()));

jest.mock('services/strategies/requireAuth', () => jest.fn((req, res, done) => done()));

describe('Dashboard Data Route', () => {
  afterEach(() => {
    requireAuth.mockClear();
    getAll.mockClear();
  });

  it('routes initial requests to authentication middleware', async () => {
    await app()
      .get('/api/dashboard')
      .then(() => {
        expect(requireAuth).toHaveBeenCalledTimes(1);
      });
  });

  it('routes authenticated requests to the correct controller', async () => {
    await app()
      .get('/api/dashboard')
      .then(() => {
        expect(getAll).toHaveBeenCalledTimes(1);
      });
  });
});
