import { fetchRecords } from "controllers/messages";
import { missingQueryParams } from "errors";
import { loginUser, mockRequest, mockResponse } from "../../__mocks__/helpers";

describe("Index Message Controller", () => {
  let user;
  beforeAll(async () => {
    user = await loginUser();
  });

  let res;
  beforeEach(() => {
    res = mockResponse();
  });

  it("handles missing query params requests", async () => {
    const req = mockRequest(null, null, { page: "", limit: "" });

    await fetchRecords(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingQueryParams,
    });
  });

  it("handles valid fetch count requests", async () => {
    const req = mockRequest(user, null, { page: "0", limit: "10" });

    await fetchRecords(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      messages: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          key: expect.any(Number),
          userid: expect.any(String),
          fromsender: expect.any(String),
          subject: expect.any(String),
          sentdate: expect.any(String),
          template: expect.any(String),
          plans: expect.arrayContaining([expect.any(String)]),
        }),
      ]),
    });
  });
});
