import passport from "passport";
import {
  alreadyLoggedIn,
  badCredentials,
  emailConfirmationReq,
} from "authErrors";
import {
  mockRequest,
  mockResponse,
  loginUser,
  signupUser,
} from "../__mocks__/strategyhelpers";

const emptybody = {
  email: "",
  password: "",
};

const validuser = {
  email: "betatester@subskribble.com",
  password: "password123",
};

const invaliduser = {
  email: "test@test.com",
  password: "password123",
};

const badpassword = {
  email: "betatester@subskribble.com",
  password: "123456",
};

const newuser = {
  email: "unverifieduser@test.com",
  password: "password123",
};

const next = cb => jest.fn().mockReturnValue(cb);

describe("Local Login Middleware", () => {
  let user;
  beforeAll(async () => {
    user = await loginUser();
    await signupUser("unverifieduser@test.com", "Unverified User");
  });

  let res;
  beforeEach(() => {
    res = mockResponse();
  });

  it("handles empty body requests", async (done) => {
    const req = mockRequest(null, emptybody);

    await passport.authenticate(
      "local-login",
      (err, existingUser, response) => {
        expect(err).toBeNull();
        expect(existingUser).toBeFalsy();
        expect(response.message).toBe("Missing credentials");
        done();
      },
    )(req, res, next);
  });

  it("handles user is already signed in requests", async (done) => {
    const req = mockRequest(user, validuser);

    await passport.authenticate("local-login", (err, existingUser) => {
      expect(err).toEqual(alreadyLoggedIn);
      expect(existingUser).toBeFalsy();
      done();
    })(req, res, next);
  });

  it("handles invalid user account sign in requests", async (done) => {
    const req = mockRequest(null, invaliduser);

    await passport.authenticate("local-login", (err, existingUser) => {
      expect(err).toEqual(badCredentials);
      expect(existingUser).toBeFalsy();
      done();
    })(req, res, next);
  });

  it("handles unverified new user sign in requests", async (done) => {
    const req = mockRequest(null, newuser);

    await passport.authenticate("local-login", (err, existingUser) => {
      expect(err).toEqual(emailConfirmationReq);
      expect(existingUser).toBeFalsy();
      done();
    })(req, res, next);
  });

  it("handles invalid password sign in requests", async (done) => {
    const req = mockRequest(null, badpassword);

    await passport.authenticate("local-login", (err, existingUser) => {
      expect(err).toEqual(badCredentials);
      expect(existingUser).toBeFalsy();
      done();
    })(req, res, next);
  });

  it("handles valid password sign in requests", async (done) => {
    const req = mockRequest(null, validuser);

    await passport.authenticate("local-login", (err, existingUser) => {
      expect(err).toBeNull();
      expect(existingUser).toBeTruthy();
      expect(req.session).toEqual({
        id: expect.any(String),
        company: expect.any(String),
        collapsesidenav: expect.any(Boolean),
        email: expect.any(String),
        firstname: expect.any(String),
        isgod: expect.any(Boolean),
        lastname: expect.any(String),
      });
      done();
    })(req, res, next);
  });
});
