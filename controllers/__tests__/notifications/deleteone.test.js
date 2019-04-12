import db from "db";
import { selectNotificationByKey } from "queries";
import { deleteOne } from "controllers/notifications";
import { missingDeletionParams } from "errors";
import { loginUser, mockRequest, mockResponse } from "../../__mocks__/helpers";

describe("DeleteOne Notification Controller", () => {
  let user;
  beforeAll(async () => {
    user = await loginUser();
  });

  let res;
  beforeEach(() => {
    res = mockResponse();
  });

  it("handles missing id query delete requests", async () => {
    const req = mockRequest(null, null, { id: "" });

    await deleteOne(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingDeletionParams,
    });
  });

  it("handles valid delete requests", async () => {
    const notification = await db.one(selectNotificationByKey, [3]);
    const req = mockRequest(user, null, {
      id: notification.id,
    });

    await deleteOne(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });
});
