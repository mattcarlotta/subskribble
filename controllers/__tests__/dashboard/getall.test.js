import getAll from "controllers/dashboard";
import { loginUser, mockRequest, mockResponse } from "../../__mocks__/helpers";

describe("Dashboard Data Controller", () => {
  let user;
  beforeAll(async () => {
    user = await loginUser();
  });

  let res;
  beforeEach(() => {
    res = mockResponse();
  });

  it("handles invalid req calls", async () => {
    const req = mockRequest();

    await getAll(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: "TypeError: Cannot read property 'id' of undefined",
    });
  });

  it("retrieves any dashboard data", async () => {
    const req = mockRequest(user);

    await getAll(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({
      subscribers: expect.any(String),
      inactivesubscribers: expect.any(String),
      plans: expect.any(String),
      popularplans: expect.objectContaining([
        {
          planname: expect.any(String),
          subscribers: expect.any(Number),
        },
      ]),
      promotionals: expect.any(String),
      popularpromotionals: expect.objectContaining([
        {
          promocode: expect.any(String),
        },
      ]),
      credits: expect.any(String),
      creditstotal: expect.any(String),
      dues: expect.any(String),
      duestotal: expect.any(String),
      charges: expect.any(String),
      chargestotal: expect.any(String),
      refunds: expect.any(String),
      refundstotal: expect.any(String),
      messages: expect.any(String),
      activetemplates: expect.any(String),
      inactivetemplates: expect.any(String),
    });
  });
});
