import app from "utils/setup";
import db from "db";
import { thanksForReg } from "authSuccess";
import { findUserByEmail, verifyEmail } from "queries";

const loginUser = () => db.one(findUserByEmail, ["betatester@subskribble.com"]);

const signupUser = async (email, company, isValid) => {
  await db.task("setup-signup", async (dbtask) => {
    await app()
      .post("/api/signup")
      .send({
        email,
        company,
        password: "password123",
        firstName: "Test",
        lastName: "Signup",
      })
      .then((res) => {
        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual(thanksForReg(email, "Test", "Signup"));
      });

    if (isValid) await dbtask.none(verifyEmail, [email]);
  });

  return db.one(findUserByEmail, [email]);
};

const mockRequest = (session, body, query, params) => ({
  session,
  body,
  query,
  params,
});

const mockResponse = () => {
  const res = {};
  res.clearCookie = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.end = jest.fn().mockReturnValue(res);
  return res;
};

export {
  loginUser, mockRequest, mockResponse, signupUser,
};
