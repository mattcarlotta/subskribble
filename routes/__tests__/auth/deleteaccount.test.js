import app from "utils/setup";
import { deleteAccount } from "controllers/auth";
import { requireAuth } from "strategies";

jest.mock("controllers/auth", () => ({
  ...require.requireActual("controllers/auth"),
  deleteAccount: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireAuth", () => jest.fn((req, res, done) => done()));

describe("Delete Account Route", () => {
  afterEach(() => {
    requireAuth.mockClear();
    deleteAccount.mockClear();
  });

  it("routes initial requests to authentication middleware", async () => {
    await app()
      .delete("/api/delete-account")
      .then(() => {
        expect(requireAuth).toHaveBeenCalledTimes(1);
      });
  });

  it("routes authenticated requests to the deleteaccount controller", async () => {
    await app()
      .delete("/api/delete-account")
      .then(() => {
        expect(deleteAccount).toHaveBeenCalledTimes(1);
      });
  });
});
