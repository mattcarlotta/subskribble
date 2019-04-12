import app from 'utils/setup';
import { fetchCounts } from 'controllers/messages';
import { requireAuth } from 'strategies';

jest.mock('controllers/messages', () => ({
  ...require.requireActual('controllers/messages'),
  fetchCounts: jest.fn((req, res, done) => done()),
}));

jest.mock('services/strategies/requireAuth', () => jest.fn((req, res, done) => done()));

describe('Message Fetch Counts Route', () => {
  afterEach(() => {
    requireAuth.mockClear();
    fetchCounts.mockClear();
  });

  it('routes initial requests to authentication middleware', async () => {
    await app()
      .get('/api/messagecounts')
      .then(() => {
        expect(requireAuth).toHaveBeenCalledTimes(1);
      });
  });

  it('routes authenticated requests to the fetch counts controller', async () => {
    await app()
      .get('/api/messagecounts')
      .then(() => {
        expect(fetchCounts).toHaveBeenCalledTimes(1);
      });
  });
});
