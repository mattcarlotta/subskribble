import app from 'utils/setup';
import getCookie from 'utils/getCookie';
import getAll from 'controllers/dashboard';
import { requireAuth } from 'strategies';

jest.mock('../../../controllers/dashboard', () => jest.fn((req, res, done) => done()));

jest.mock('../../../services/strategies/requireAuth', () => jest.fn((req, res, done) => done()));

describe('Dashboard Data Route', () => {
  let cookie;
  beforeAll(async () => {
    cookie = await getCookie();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should route initial requests to authentication middleware', async () => {
    await app()
      .get('/api/dashboard')
      .then(() => {
        expect(requireAuth).toHaveBeenCalled();
      });
  });

  it('should route authenticated requests to the correct controller', async () => {
    jest.unmock('../../../services/strategies/requireAuth');
    await app()
      .get('/api/dashboard')
      .set('Cookie', cookie)
      .then(() => {
        expect(getAll).toHaveBeenCalled();
      });
  });
});
