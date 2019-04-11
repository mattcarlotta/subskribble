import app from 'utils/setup';
import { create } from 'controllers/auth';

jest.mock('../../../controllers/auth', () => ({
  ...require.requireActual('../../../controllers/auth'),
  create: jest.fn((req, res, done) => done()),
}));

describe('Create Account Route', () => {
  it('routes requests to the create controller', async () => {
    await app()
      .post('/api/signup')
      .then(() => {
        expect(create).toHaveBeenCalledTimes(1);
      });
    create.mockRestore();
  });
});
