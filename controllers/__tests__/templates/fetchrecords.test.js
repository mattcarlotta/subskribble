import { fetchRecords } from "controllers/templates";
import { missingQueryParams } from "errors";
import { loginUser, mockRequest, mockResponse } from "../../__mocks__/helpers";

const emptyquery = {
  table: "",
  page: "",
  limit: "",
};

describe("Fetch Records Templates Controller", () => {
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
      table: "activetemplates",
      page: "0",
      limit: "10",
    });
    const res = mockResponse();

    await fetchRecords(req, res);
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
