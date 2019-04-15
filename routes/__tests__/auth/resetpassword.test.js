import app from "utils/setup";
import { resetPassword } from "controllers/auth";
import { createRandomToken } from "helpers";

jest.mock("controllers/auth", () => ({
  ...require.requireActual("controllers/auth"),
  resetPassword: jest.fn((req, res, done) => done()),
}));

describe("Reset Password Route", () => {
  it("routes requests to the resetPassword controller", async () => {
    await app()
      .put(`/api/reset-password/verify?token=${createRandomToken()}`)
      .then(() => {
        expect(resetPassword).toHaveBeenCalledTimes(1);
      });
  });
});
