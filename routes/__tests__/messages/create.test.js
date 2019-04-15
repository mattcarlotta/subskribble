import app from "utils/setup";
import { create } from "controllers/messages";
import { requireAuth } from "strategies";

jest.mock("controllers/messages", () => ({
  ...require.requireActual("controllers/messages"),
  create: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireAuth", () => jest.fn((req, res, done) => done()));

describe("Create Message Route", () => {
  afterEach(() => {
    requireAuth.mockClear();
    create.mockClear();
  });

  it("routes initial requests to authentication middleware", async () => {
    await app()
      .post("/api/messages/create")
      .then(() => {
        expect(requireAuth).toHaveBeenCalledTimes(1);
      });
  });

  it("routes authenticated requests to the create controller", async () => {
    await app()
      .post("/api/messages/create")
      .then(() => {
        expect(create).toHaveBeenCalledTimes(1);
      });
  });
});
