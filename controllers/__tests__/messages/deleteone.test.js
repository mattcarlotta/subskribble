import db from "db";
import { selectMessageByKey } from "queries";
import { deleteOne } from "controllers/messages";
import { missingDeletionParams } from "errors";
import { loginUser, mockRequest, mockResponse } from "../../__mocks__/helpers";

describe("DeleteOne Message Controller", () => {
  let user;
  beforeAll(async () => {
    user = await loginUser();
  });

  let res;
  beforeEach(() => {
    res = mockResponse();
  });

  it("handles missing id parmas delete requests", async () => {
    const req = mockRequest(null, null, null, { id: "" });

    await deleteOne(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingDeletionParams,
    });
  });

  it("handles valid delete requests", async () => {
    const message = await db.one(selectMessageByKey, [3]);
    const req = mockRequest(user, null, null, {
      id: message.id,
    });

    await deleteOne(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });
});
