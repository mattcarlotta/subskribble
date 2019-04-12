import app from 'utils/setup';
import getAll from 'controllers/dashboard';
import { requireAuth } from 'strategies';

jest.mock('../../../controllers/dashboard', () => jest.fn());

jest.mock('../../../services/strategies/requireAuth', () => jest.fn());

describe('Dashboard Data Route', () => {
  afterEach(() => {
    requireAuth.mockClear();
    getAll.mockClear();
  });

  it('routes initial requests to authentication middleware', () => {
    app()
      .get('/api/dashboard')
      .then(() => {
        expect(requireAuth).toHaveBeenCalled();
      });
  });

  it('routes authenticated requests to the correct controller', () => {
    app()
      .get('/api/dashboard')
      .then(() => {
        expect(getAll).toHaveBeenCalled();
      });
  });
});
