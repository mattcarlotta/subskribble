import app from 'utils/setup';
import { resetToken } from 'controllers/auth';

jest.mock('../../../controllers/auth', () => ({
  ...require.requireActual('../../../controllers/auth'),
  resetToken: jest.fn(),
}));

describe('Reset Token Route', () => {
  it('routes requests to the resetToken controller', () => {
    app()
      .put('/api/reset-token')
      .then(() => {
        expect(resetToken).toHaveBeenCalledTimes(1);
      });
  });
});
