import passport from "passport";
import mailer from "@sendgrid/mail";
import { companyAlreadyExists, emailAlreadyTaken } from "authErrors";
import { missingCreationParams } from "errors";
import { mockRequest, mockResponse } from "../__mocks__/strategyhelpers";

const next = cb => jest.fn().mockReturnValue(cb);

const emptybody = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  company: "",
};

const missingbody = {
  email: "betateser123456@subskribble.com",
  password: "password123",
  firstName: "",
  lastName: "",
  company: "",
};

const userexists = {
  email: "betatester@subskribble.com",
  password: "password123",
  firstName: "Beta",
  lastName: "Tester",
  company: "Subskribble",
};

const companyexists = {
  email: "betatester8888@subskribble.com",
  password: "password123",
  firstName: "Beta",
  lastName: "Tester",
  company: "Subskribble",
};

const newuser = {
  email: "betatester55555@subskribble.com",
  password: "password123",
  firstName: "Beta",
  lastName: "Tester",
  company: "New Signups LLC",
};

describe("Local Signup Middleware", () => {
  let res;
  beforeEach(() => {
    res = mockResponse();
  });

  it("handles empty body requests", async (done) => {
    const req = mockRequest(null, emptybody);

    await passport.authenticate(
      "local-signup",
      (err, existingUser, response) => {
        expect(err).toBeNull();
        expect(existingUser).toBeFalsy();
        expect(response.message).toBe("Missing credentials");
        done();
      },
    )(req, res, next);
  });

  it("handles missing body requests", async (done) => {
    const req = mockRequest(null, missingbody);

    await passport.authenticate("local-signup", (err, existingUser) => {
      expect(err).toEqual(missingCreationParams);
      expect(existingUser).toBeFalsy();
      done();
    })(req, res, next);
  });

  it("handles user already exists requests", async (done) => {
    const req = mockRequest(null, userexists);

    await passport.authenticate("local-signup", (err, existingUser) => {
      expect(err).toEqual(emailAlreadyTaken);
      expect(existingUser).toBeFalsy();
      done();
    })(req, res, next);
  });

  it("handles company already exists requests", async (done) => {
    const req = mockRequest(null, companyexists);

    await passport.authenticate("local-signup", (err, existingUser) => {
      expect(err).toEqual(companyAlreadyExists);
      expect(existingUser).toBeFalsy();
      done();
    })(req, res, next);
  });

  it("handles valid new sign up requests", async (done) => {
    const req = mockRequest(null, newuser);

    await passport.authenticate("local-signup", (err, existingUser) => {
      expect(err).toBeNull();
      expect(existingUser).toBeTruthy();
      expect(mailer.send).toHaveBeenCalled();
      done();
    })(req, res, next);
  });
});
