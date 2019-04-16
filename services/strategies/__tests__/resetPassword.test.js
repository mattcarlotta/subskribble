import passport from "passport";
import { invalidToken, missingToken, notUniquePassword } from "authErrors";
import { createRandomToken } from "helpers";
import {
  mockRequest,
  mockResponse,
  signupUser,
} from "../__mocks__/strategyhelpers";

const emptybody = {
  email: "",
  password: "",
};

const oldpassword = "password123";
const newpassword = "newpassword123";

const next = cb => jest.fn().mockReturnValue(cb);

describe("Reset Password Middleware", () => {
  let user;
  beforeAll(async () => {
    user = await signupUser(
      "passwordresetuser@test.com",
      "Password Reset Inc",
      true,
    );
  });

  let res;
  beforeEach(() => {
    res = mockResponse();
  });

  it("handles empty body requests", async (done) => {
    const req = mockRequest(null, emptybody);

    await passport.authenticate(
      "reset-password",
      (err, existingUser, response) => {
        expect(err).toBeNull();
        expect(existingUser).toBeFalsy();
        expect(response.message).toBe("Missing credentials");
        done();
      },
    )(req, res, next);
  });

  it("handles missing token requests", async (done) => {
    const req = mockRequest(
      null,
      { email: user.email, password: newpassword },
      { token: "" },
    );

    await passport.authenticate("reset-password", (err, existingUser) => {
      expect(err).toEqual(missingToken);
      expect(existingUser).toBeFalsy();
      done();
    })(req, res, next);
  });

  it("handles invalid token requests", async (done) => {
    const req = mockRequest(
      null,
      { email: user.email, password: newpassword },
      { token: `${createRandomToken()}` },
    );

    await passport.authenticate("reset-password", (err, existingUser) => {
      expect(err).toEqual(invalidToken);
      expect(existingUser).toBeFalsy();
      done();
    })(req, res, next);
  });

  it("handles same password requests", async (done) => {
    const req = mockRequest(
      null,
      { email: user.email, password: oldpassword },
      { token: user.token },
    );

    await passport.authenticate("reset-password", (err, existingUser) => {
      expect(err).toEqual(notUniquePassword);
      expect(existingUser).toBeFalsy();
      done();
    })(req, res, next);
  });

  it("handles valid password reset requests", async (done) => {
    const req = mockRequest(
      null,
      { email: user.email, password: newpassword },
      { token: user.token },
    );

    await passport.authenticate("reset-password", (err, existingUser) => {
      expect(err).toBeNull();
      expect(existingUser).toBe(user.email);
      done();
    })(req, res, next);
  });
});
