import app from "utils/setup";
import { loggedin } from "controllers/auth";
import { requireRelogin } from "strategies";

jest.mock("controllers/auth", () => ({
  ...require.requireActual("controllers/auth"),
  loggedin: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireRelogin", () => jest.fn((req, res, done) => done()));

describe("Loggedin Session Route", () => {
  afterEach(() => {
    requireRelogin.mockClear();
    loggedin.mockClear();
  });

  it("routes initial requests to authentication middleware", async () => {
    await app()
      .get("/api/loggedin")
      .then(() => {
        expect(requireRelogin).toHaveBeenCalledTimes(1);
      });
  });

  it("routes authenticated requests to the loggedin controller", async () => {
    await app()
      .get("/api/loggedin")
      .then(() => {
        expect(loggedin).toHaveBeenCalledTimes(1);
      });
  });
});
