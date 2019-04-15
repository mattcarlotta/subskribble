import { fetchRecords } from "controllers/transactions";
import { missingQueryParams } from "errors";
import { loginUser, mockRequest, mockResponse } from "../../__mocks__/helpers";

const emptyquery = {
  table: "",
  page: "",
  limit: "",
};

describe("Fetch Records Transactions Controller", () => {
  let user;
  beforeAll(async () => {
    user = await loginUser();
  });

  it("handles empty query requests", async () => {
    const req = mockRequest(null, null, emptyquery);
    const res = mockResponse();

    await fetchRecords(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingQueryParams,
    });
  });

  it("handles valid fetch records requests", async () => {
    const req = mockRequest(user, null, {
      table: "charges",
      page: "0",
      limit: "10",
    });
    const res = mockResponse();

    await fetchRecords(req, res);
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
          chargedate: expect.any(String),
          refunddate: expect.toBeNullOrType(typeof "String"),
        }),
      ]),
    });
  });
});
