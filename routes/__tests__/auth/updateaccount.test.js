import app from 'utils/setup';
import { updateAccount } from 'controllers/auth';
import { requireAuth } from 'strategies';

jest.mock('../../../controllers/auth', () => ({
  ...require.requireActual('../../../controllers/auth'),
  updateAccount: jest.fn(),
}));

jest.mock('../../../services/strategies/requireAuth', () => jest.fn());

describe('Update Account Route', () => {
  afterEach(() => {
    requireAuth.mockClear();
    updateAccount.mockClear();
  });

  it('routes initial requests to authentication middleware', () => {
    app()
      .put('/api/update-account')
      .then(() => {
        expect(requireAuth).toHaveBeenCalledTimes(1);
      });
  });

  it('routes authenticated requests to the updateAccount controller', () => {
    app()
      .put('/api/update-account')
      .then(() => {
        expect(updateAccount).toHaveBeenCalledTimes(1);
      });
  });
});
