import app from 'utils/setup';
import { resetToken } from 'controllers/auth';

jest.mock('../../../controllers/auth', () => ({
  ...require.requireActual('../../../controllers/auth'),
  resetToken: jest.fn((req, res, done) => done()),
}));

describe('Reset Token Route', () => {
  afterAll(() => {
    resetToken.mockRestore();
  });

  it('routes requests to the resetToken controller', async () => {
    await app()
      .put('/api/reset-token')
      .then(() => {
        expect(resetToken).toHaveBeenCalledTimes(1);
      });
  });
});
