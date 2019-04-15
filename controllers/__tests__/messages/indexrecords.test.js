import { index } from "controllers/messages";
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

  it("handles valid fetch count requests", async () => {
    const req = mockRequest(user);

    await index(req, res);
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
