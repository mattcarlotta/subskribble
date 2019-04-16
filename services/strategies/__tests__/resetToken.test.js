import mailer from "@sendgrid/mail";
import passport from "passport";
import { missingEmailCreds } from "authErrors";
import {
  mockRequest,
  mockResponse,
  signupUser,
} from "../__mocks__/strategyhelpers";

const emptybody = {
  email: "",
  password: "",
};

const invalidemail = {
  email: "invaliduseremail@test.com",
  password: "password123",
};

const next = cb => jest.fn().mockReturnValue(cb);

describe("Reset Token Middleware", () => {
  let user;
  beforeAll(async () => {
    user = await signupUser(
      "resetusertoken123@test.com",
      "Reset Token Inc",
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
      "reset-token",
      (err, existingUser, response) => {
        expect(err).toBeNull();
        expect(existingUser).toBeFalsy();
        expect(response.message).toBe("Missing credentials");
        done();
      },
    )(req, res, next);
  });

  it("handles invalid email requests", async (done) => {
    const req = mockRequest(null, invalidemail);

    await passport.authenticate("reset-token", (err, existingUser) => {
      expect(err).toEqual(missingEmailCreds);
      expect(existingUser).toBeFalsy();
      done();
    })(req, res, next);
  });

  it("handles valid reset token requests", async (done) => {
    const req = mockRequest(null, {
      email: user.email,
      password: "password123",
    });

    await passport.authenticate("reset-token", (err, existingUser) => {
      expect(err).toBeNull();
      expect(existingUser).toEqual(user.email);
      expect(mailer.send).toHaveBeenCalled();
      done();
    })(req, res, next);
  });
});
