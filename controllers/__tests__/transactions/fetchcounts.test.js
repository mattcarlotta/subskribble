import { fetchCounts } from "controllers/transactions";
import { loginUser, mockRequest, mockResponse } from "../../__mocks__/helpers";

describe("Fetch Transaction Counts Controller", () => {
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
      chargecount: expect.any(Number),
      refundcount: expect.any(Number),
    });
  });
});
