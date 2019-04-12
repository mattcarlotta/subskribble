import passport from "passport";
import { login } from "controllers/auth";
import { badCredentials } from "authErrors";
import { mockRequest, mockResponse, signupUser } from "../../__mocks__/helpers";

const newSignupEmail = "loginuser@test.com";
const newCompany = "Login Handlers LLC";

describe("Login Session Controller", () => {
  let user;
  beforeAll(async () => {
    user = await signupUser(newSignupEmail, newCompany);
  });

  let res;
  beforeEach(() => {
    res = mockResponse();
  });

  it("handles invalid loggedin session requests", async () => {
    const req = mockRequest(null, { email: "", password: "" });

    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: badCredentials,
    });
  });

  it("handles invalid login requests to the local login strategy", async () => {
    passport.authenticate = jest.fn((strategy, callback) => () => callback("Invalid email and/or password."));

    const req = mockRequest(null, {
      email: newSignupEmail,
      password: "password123",
    });

    await login(req, res);
    expect(passport.authenticate).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: "Invalid email and/or password.",
    });
    passport.authenticate.mockRestore();
  });

  it("handles valid login requests to the local login strategy", async () => {
    passport.authenticate = jest.fn((strategy, callback) => () => callback(""));

    const req = mockRequest(user, {
      email: newSignupEmail,
      password: "password123",
    });

    await login(req, res);
    expect(passport.authenticate).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      ...user,
    });
    passport.authenticate.mockRestore();
  });
});
