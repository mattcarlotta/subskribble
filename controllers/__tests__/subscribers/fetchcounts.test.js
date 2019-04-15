import { fetchCounts } from "controllers/subscribers";
import { loginUser, mockRequest, mockResponse } from "../../__mocks__/helpers";

describe("Fetch Subscriber Counts Controller", () => {
  let user;
  beforeAll(async () => {
    user = await loginUser();
  });

  it("handles valid fetch counts requests", async () => {
    const req = mockRequest(user);
    const res = mockResponse();

    await fetchCounts(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      activesubscriberscount: expect.any(Number),
      inactivesubscriberscount: expect.any(Number),
    });
  });
});
