import { index } from "controllers/plans";
import { loginUser, mockRequest, mockResponse } from "../../__mocks__/helpers";

describe("Fetch Index Plans Controller", () => {
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
      activeplans: expect.arrayContaining([
        expect.objectContaining({
          amount: expect.any(String),
          description: expect.any(String),
          planname: expect.any(String),
        }),
      ]),
      inactiveplans: expect.arrayContaining([
        expect.objectContaining({
          amount: expect.any(String),
          description: expect.any(String),
          planname: expect.any(String),
        }),
      ]),
    });
  });
});
