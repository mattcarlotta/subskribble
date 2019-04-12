import app from 'utils/setup';
import { deleteAccount } from 'controllers/auth';
import { requireAuth } from 'strategies';

jest.mock('../../../controllers/auth', () => ({
  ...require.requireActual('../../../controllers/auth'),
  deleteAccount: jest.fn(),
}));

jest.mock('../../../services/strategies/requireAuth', () => jest.fn());

describe('Delete Account Route', () => {
  afterEach(() => {
    requireAuth.mockClear();
    deleteAccount.mockClear();
  });

  it('routes initial requests to authentication middleware', () => {
    app()
      .delete('/api/delete-account')
      .then(() => {
        expect(requireAuth).toHaveBeenCalledTimes(1);
      });
  });

  it('routes authenticated requests to the deleteaccount controller', () => {
    app()
      .delete('/api/delete-account')
      .then(() => {
        expect(deleteAccount).toHaveBeenCalledTimes(1);
      });
  });
});
