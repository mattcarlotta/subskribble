import { saveSidebarState } from 'controllers/auth';
import { missingSidebarState } from 'authErrors';
import { mockRequest, mockResponse, signupUser } from '../../__mocks__/helpers';

const newSignupEmail = 'sidebar@test.com';
const newCompany = 'Sidebar Handlers LLC';

describe('Sidebar State Controller', () => {
  let user;
  beforeAll(async () => {
    user = await signupUser(newSignupEmail, newCompany);
  });

  let res;
  beforeEach(() => {
    res = mockResponse();
  });

  it('handles empty query requests', async () => {
    const req = mockRequest(null, null, { collapseSideNav: '' });

    await saveSidebarState(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingSidebarState,
    });
  });

  it('handles valid requests to update sidebar state', async () => {
    const req = mockRequest({ ...user }, null, { collapseSideNav: true });

    await saveSidebarState(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      collapseSideNav: true,
    });
  });
});
