import app from 'utils/setup';
import { createRandomToken } from 'helpers';
import { verifyAccount } from 'controllers/auth';

jest.mock('../../../controllers/auth', () => ({
  ...require.requireActual('../../../controllers/auth'),
  verifyAccount: jest.fn((req, res, done) => done()),
}));

describe('Update Account Route', () => {
  it('routes requests to the verifyAccount controller', async () => {
    await app()
      .put(`/api/email/verify?token=${createRandomToken()}`)
      .then(() => {
        expect(verifyAccount).toHaveBeenCalledTimes(1);
      });
    verifyAccount.mockRestore();
  });
});
