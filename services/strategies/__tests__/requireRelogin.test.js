import { requireRelogin } from "strategies";
import {
  mockRequest,
  mockResponse,
  loginUser,
} from "../__mocks__/strategyhelpers";

const next = jest.fn();

describe("Require Relogin Middleware", () => {
  let user;
  beforeAll(async () => {
    user = await loginUser();
  });

  let res;
  beforeEach(() => {
    res = mockResponse();
  });

  it("handles present login sessions", async (done) => {
    const req = mockRequest({});

    await requireRelogin(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(null);
    done();
  });

  it("handles missing login sessions", async (done) => {
    const req = mockRequest(user);

    await requireRelogin(req, res, next);
    expect(next).toHaveBeenCalled();
    done();
  });
});
