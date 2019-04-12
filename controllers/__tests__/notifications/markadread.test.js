import { updateAll } from "controllers/notifications";
import { loginUser, mockRequest, mockResponse } from "../../__mocks__/helpers";

describe("UpdateAll Notification Controller", () => {
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

    await updateAll(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });
});
