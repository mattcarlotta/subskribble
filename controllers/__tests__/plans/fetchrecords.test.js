import { fetchRecords } from "controllers/plans";
import { missingQueryParams } from "errors";
import { loginUser, mockRequest, mockResponse } from "../../__mocks__/helpers";

const emptyquery = {
  table: "",
  page: "",
  limit: "",
};

describe("Fetch Records Plans Controller", () => {
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
      table: "activeplans",
      page: "0",
      limit: "10",
    });
    const res = mockResponse();

    await fetchRecords(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      activeplans: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          key: expect.any(Number),
          userid: expect.any(String),
          planname: expect.any(String),
          description: expect.any(String),
          amount: expect.any(String),
          setupfee: expect.toBeNullOrType(typeof "String"),
          billevery: expect.any(String),
          trialperiod: expect.toBeNullOrType(typeof "String"),
          status: expect.any(String),
          startdate: expect.any(Date),
          subscribers: expect.any(Number),
        }),
      ]),
    });
  });
});
