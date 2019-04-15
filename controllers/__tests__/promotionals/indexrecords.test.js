import { index } from "controllers/promotionals";
import { loginUser, mockRequest, mockResponse } from "../../__mocks__/helpers";

describe("Fetch Index Promotionals Controller", () => {
  let user;
  beforeAll(async () => {
    user = await loginUser();
  });

  it("handles valid fetch counts requests", async () => {
    const req = mockRequest(user);
    const res = mockResponse();

    await index(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      activepromos: expect.arrayContaining([
        expect.objectContaining({
          amount: expect.any(Number),
          discounttype: expect.any(String),
          enddate: expect.any(Date),
          id: expect.any(String),
          key: expect.any(Number),
          maxusage: expect.any(Number),
          plans: expect.arrayContaining([expect.any(String)]),
          promocode: expect.any(String),
          startdate: expect.any(Date),
          status: expect.any(String),
          totalusage: expect.any(Number),
          userid: expect.any(String),
        }),
      ]),
      inactivepromos: expect.arrayContaining([
        expect.objectContaining({
          amount: expect.any(Number),
          discounttype: expect.any(String),
          enddate: expect.any(Date),
          id: expect.any(String),
          key: expect.any(Number),
          maxusage: expect.any(Number),
          plans: expect.arrayContaining([expect.any(String)]),
          promocode: expect.any(String),
          startdate: expect.any(Date),
          status: expect.any(String),
          totalusage: expect.any(Number),
          userid: expect.any(String),
        }),
      ]),
    });
  });
});
