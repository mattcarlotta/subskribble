import { fetchAllActiveRecords } from "controllers/plans";
import { createPlanFirst } from "errors";
import {
  loginUser,
  mockRequest,
  mockResponse,
  signupUser,
} from "../../__mocks__/helpers";

describe("Fetch All Active Plans Controller", () => {
  let user;
  beforeAll(async () => {
    user = await loginUser();
  });

  it("handles requests when a user doesn't have any created plans yet", async () => {
    const newUser = await signupUser("newusernoplans@test.com", "No Plans LLC");
    const req = mockRequest(newUser);
    const res = mockResponse();

    await fetchAllActiveRecords(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: createPlanFirst,
    });
  });

  it("handles requests where a user has active plans", async () => {
    const req = mockRequest(user);
    const res = mockResponse();

    await fetchAllActiveRecords(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      activeplans: expect.arrayContaining([
        expect.objectContaining({
          amount: expect.any(String),
          description: expect.any(String),
          planname: expect.any(String),
        }),
      ]),
    });
  });
});
