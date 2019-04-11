import { verifyAccount } from 'controllers/auth';
import { missingToken, invalidToken } from 'authErrors';
import { createRandomToken } from 'helpers';
import { mockRequest, mockResponse, signupUser } from '../../__mocks__/helpers';

const newSignupEmail = 'verification@example.com';
const newCompany = 'Verification Corp';

describe('Email Verification Controller', () => {
  let user;
  beforeAll(async () => {
    user = await signupUser(newSignupEmail, newCompany);
  });

  it('handles missing email token verification requests', async () => {
    const req = mockRequest(null, null, { token: '' });
    const res = mockResponse();

    await verifyAccount(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingToken,
    });
  });

  it('handles invalid email token verification requests', async () => {
    const req = mockRequest(null, null, { token: `${createRandomToken}` });
    const res = mockResponse();

    await verifyAccount(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: invalidToken,
    });
  });

  it('handles valid email token verification requests', async () => {
    const req = mockRequest(null, null, { token: user.token });
    const res = mockResponse();

    await verifyAccount(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      email: user.email,
    });
  });
});
