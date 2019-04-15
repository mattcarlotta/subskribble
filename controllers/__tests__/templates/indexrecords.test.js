import { index } from "controllers/templates";
import { loginUser, mockRequest, mockResponse } from "../../__mocks__/helpers";

describe("Fetch Index Templates Controller", () => {
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
      inactivetemplates: expect.arrayContaining([
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
