import app from 'utils/setup';
import { create } from 'controllers/auth';

jest.mock('../../../controllers/auth', () => ({
  ...require.requireActual('../../../controllers/auth'),
  create: jest.fn(),
}));

describe('Create Account Route', () => {
  it('routes requests to the create controller', () => {
    app()
      .post('/api/signup')
      .then(() => {
        expect(create).toHaveBeenCalledTimes(1);
      });
  });
});
