import db from "db";
import { deleteAllNotifications } from "queries";
import { deleteAll } from "controllers/notifications";
import { mockRequest, mockResponse } from "../../__mocks__/helpers";

jest.mock("db", () => ({
  ...require.requireActual("db"),
  result: jest.fn(),
}));

describe("DeleteAll Notification Controller", () => {
  let res;
  beforeEach(() => {
    res = mockResponse();
  });

  it("handles valid delete all requests", async () => {
    const req = mockRequest({ id: "008b2cbe-5bb6-11e9-8d9f-9fe6a40024c0" });

    await deleteAll(req, res);

    expect(db.result).toHaveBeenCalledWith(deleteAllNotifications, [
      req.session.id,
    ]);
    expect(res.status).toHaveBeenCalledWith(201);
    db.result.mockRestore();
  });
});
