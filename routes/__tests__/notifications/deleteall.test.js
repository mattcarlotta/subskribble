import app from "utils/setup";
import { deleteAll } from "controllers/notifications";
import { requireAuth } from "strategies";

jest.mock("controllers/notifications", () => ({
  ...require.requireActual("controllers/notifications"),
  deleteAll: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireAuth", () => jest.fn((req, res, done) => done()));

describe("Delete All Notifications Route", () => {
  afterEach(() => {
    requireAuth.mockClear();
    deleteAll.mockClear();
  });

  it("routes initial requests to authentication middleware", async () => {
    await app()
      .delete("/api/notifications/deleteall")
      .then(() => {
        expect(requireAuth).toHaveBeenCalledTimes(1);
      });
  });

  it("routes authenticated requests to the deleteAll controller", async () => {
    await app()
      .delete("/api/notifications/deleteall")
      .then(() => {
        expect(deleteAll).toHaveBeenCalledTimes(1);
      });
  });
});
