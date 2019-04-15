import { fetchAllActiveRecords } from "controllers/templates";
import { createPlanFirst } from "errors";
import {
  loginUser,
  mockRequest,
  mockResponse,
  signupUser,
} from "../../__mocks__/helpers";

describe("Fetch All Active Temaples Controller", () => {
  let user;
  beforeAll(async () => {
    user = await loginUser();
  });

  it("handles requests when a user doesn't have any created plans yet", async () => {
    const newUser = await signupUser(
      "newusernotemplates@test.com",
      "No Templates LLC",
    );
    const req = mockRequest(newUser);
    const res = mockResponse();

    await fetchAllActiveRecords(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: createPlanFirst,
    });
  });

  it("handles requests where a user has active templates", async () => {
    const req = mockRequest(user);
    const res = mockResponse();

    await fetchAllActiveRecords(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      activetemplates: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          key: expect.any(Number),
          userid: expect.any(String),
          status: expect.any(String),
          plans: expect.arrayContaining([expect.any(String)]),
          subject: expect.any(String),
          templatename: expect.any(String),
          uniquetemplatename: expect.any(String),
          message: expect.any(String),
        }),
      ]),
    });
  });
});
