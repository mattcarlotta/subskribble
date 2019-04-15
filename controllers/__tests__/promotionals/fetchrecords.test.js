import { fetchRecords } from "controllers/promotionals";
import { missingQueryParams } from "errors";
import { loginUser, mockRequest, mockResponse } from "../../__mocks__/helpers";

const emptyquery = {
  table: "",
  page: "",
  limit: "",
};

describe("Fetch Records Promotionals Controller", () => {
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

  it("handles valid fetch records requets", async () => {
    const req = mockRequest(user, null, {
      table: "activepromotionals",
      page: "0",
      limit: "10",
    });
    const res = mockResponse();

    await fetchRecords(req, res);
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
    });
  });
});
