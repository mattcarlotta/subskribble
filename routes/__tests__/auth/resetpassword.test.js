import app from 'utils/setup';
import { resetPassword } from 'controllers/auth';
import { createRandomToken } from 'helpers';

jest.mock('../../../controllers/auth', () => ({
  ...require.requireActual('../../../controllers/auth'),
  resetPassword: jest.fn(),
}));

describe('Reset Password Route', () => {
  it('routes requests to the resetPassword controller', () => {
    app()
      .put(`/api/reset-password/verify?token=${createRandomToken()}`)
      .then(() => {
        expect(resetPassword).toHaveBeenCalledTimes(1);
      });
  });
});
