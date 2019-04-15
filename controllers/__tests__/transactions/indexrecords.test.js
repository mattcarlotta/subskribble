import { index } from "controllers/transactions";
import { loginUser, mockRequest, mockResponse } from "../../__mocks__/helpers";

describe("Fetch Index Transaction Controller", () => {
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
      chargetransactions: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          key: expect.any(Number),
          userid: expect.any(String),
          status: expect.any(String),
          invoice: expect.any(String),
          planname: expect.any(String),
          subscriber: expect.any(String),
          email: expect.any(String),
          processor: expect.any(String),
          amount: expect.any(String),
          chargedate: expect.toBeNullOrType(typeof "String"),
          refunddate: expect.toBeNullOrType(typeof "String"),
        }),
      ]),
      refundtransactions: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          key: expect.any(Number),
          userid: expect.any(String),
          status: expect.any(String),
          invoice: expect.any(String),
          planname: expect.any(String),
          subscriber: expect.any(String),
          email: expect.any(String),
          processor: expect.any(String),
          amount: expect.any(String),
          chargedate: expect.toBeNullOrType(typeof "String"),
          refunddate: expect.toBeNullOrType(typeof "String"),
        }),
      ]),
    });
  });
});
