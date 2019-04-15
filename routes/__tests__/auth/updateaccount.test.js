import app from "utils/setup";
import { updateAccount } from "controllers/auth";
import { requireAuth } from "strategies";

jest.mock("controllers/auth", () => ({
  ...require.requireActual("controllers/auth"),
  updateAccount: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireAuth", () => jest.fn((req, res, done) => done()));

describe("Update Account Route", () => {
  afterEach(() => {
    requireAuth.mockClear();
    updateAccount.mockClear();
  });

  it("routes initial requests to authentication middleware", async () => {
    await app()
      .put("/api/update-account")
      .then(() => {
        expect(requireAuth).toHaveBeenCalledTimes(1);
      });
  });

  it("routes authenticated requests to the updateAccount controller", async () => {
    await app()
      .put("/api/update-account")
      .then(() => {
        expect(updateAccount).toHaveBeenCalledTimes(1);
      });
  });
});
