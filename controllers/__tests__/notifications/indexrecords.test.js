import { index } from "controllers/notifications";
import { loginUser, mockRequest, mockResponse } from "../../__mocks__/helpers";

describe("Index Notification Controller", () => {
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
    expect(res.send).toHaveBeenCalledWith({
      unreadnotifications: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          key: expect.any(Number),
          userid: expect.any(String),
          read: expect.any(Boolean),
          icon: expect.any(String),
          messagedate: expect.any(String),
          message: expect.any(String),
        }),
      ]),
      readnotifications: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          key: expect.any(Number),
          userid: expect.any(String),
          read: expect.any(Boolean),
          icon: expect.any(String),
          messagedate: expect.any(String),
          message: expect.any(String),
        }),
      ]),
    });
  });
});
