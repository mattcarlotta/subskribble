import { fetchCounts } from "controllers/messages";
import { loginUser, mockRequest, mockResponse } from "../../__mocks__/helpers";

describe("FetchCounts Message Controller", () => {
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

    await fetchCounts(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      messagecounts: expect.any(Number),
    });
  });
});
