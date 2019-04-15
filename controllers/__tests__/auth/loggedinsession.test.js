import { loggedin } from "controllers/auth";
import { badCredentials } from "authErrors";
import { mockRequest, mockResponse, signupUser } from "../../__mocks__/helpers";

const newSignupEmail = "loggedinuser@test.com";
const newCompany = "LoggedIn Handlers LLC";

describe("Logged In Session Controller", () => {
  let user;
  beforeAll(async () => {
    user = await signupUser(newSignupEmail, newCompany);
  });

  let res;
  beforeEach(() => {
    res = mockResponse();
  });

  it("handles invalid loggedin session requests", async () => {
    const req = mockRequest(null);

    await loggedin(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: badCredentials,
    });
  });

  it("handles valid loggedin session requests", async () => {
    const req = mockRequest(user);

    await loggedin(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      ...user,
    });
  });
});
