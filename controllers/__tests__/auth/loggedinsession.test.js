import { loggedin } from 'controllers/auth';
import { badCredentials } from 'authErrors';
import { mockRequest, mockResponse, signupUser } from '../../__mocks__/helpers';

const newSignupEmail = 'loggedinuser@test.com';
const newCompany = 'LoggedIn Handlers LLC';

describe('Logged In Session Controller', () => {
  let user;
  beforeAll(async () => {
    user = await signupUser(newSignupEmail, newCompany);
  });

  it('handles invalid loggedin session requests', async () => {
    const req = mockRequest(null);
    const res = mockResponse();

    await loggedin(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: badCredentials,
    });
  });

  it('handles valid loggedin session requests', async () => {
    const req = mockRequest(user);
    const res = mockResponse();

    await loggedin(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      ...user,
    });
  });
});
