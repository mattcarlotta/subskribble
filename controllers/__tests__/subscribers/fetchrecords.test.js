import { fetchRecords } from "controllers/subscribers";
import { missingQueryParams } from "errors";
import { loginUser, mockRequest, mockResponse } from "../../__mocks__/helpers";

const emptyquery = {
  table: "",
  page: "",
  limit: "",
};

describe("Fetch Records Subscribers Controller", () => {
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
      table: "activesubscribers",
      page: "0",
      limit: "10",
    });
    const res = mockResponse();

    await fetchRecords(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      activesubscribers: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          key: expect.any(Number),
          userid: expect.any(String),
          status: expect.any(String),
          planname: expect.any(String),
          credits: expect.any(String),
          amount: expect.any(String),
          billingaddress: expect.toBeNullOrType(typeof "String"),
          billingcity: expect.toBeNullOrType(typeof "String"),
          billingstate: expect.toBeNullOrType(typeof "String"),
          billingunit: expect.toBeNullOrType(typeof "String"),
          billingzip: expect.toBeNullOrType(typeof "String"),
          contactaddress: expect.toBeNullOrType(typeof "String"),
          contactcity: expect.toBeNullOrType(typeof "String"),
          contactstate: expect.toBeNullOrType(typeof "String"),
          contactunit: expect.toBeNullOrType(typeof "String"),
          contactzip: expect.toBeNullOrType(typeof "String"),
          contactphone: expect.toBeNullOrType(typeof "String"),
          promocode: expect.toBeNullOrType(typeof "String"),
          samebillingaddress: expect.toBeNullOrType(typeof true),
          startdate: expect.any(Date),
          subscriber: expect.any(String),
          enddate: expect.toBeNullOrType(typeof "Date"),
        }),
      ]),
    });
  });
});
