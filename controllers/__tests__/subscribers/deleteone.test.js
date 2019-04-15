import db from "db";
import { selectSubscriberByKey } from "queries";
import { deleteOne } from "controllers/subscribers";
import { missingDeletionParams, unableToLocate } from "errors";
import { loginUser, mockRequest, mockResponse } from "../../__mocks__/helpers";

describe("Delete A subscriber Controller", () => {
  let user;
  beforeAll(async () => {
    user = await loginUser();
  });

  it("handles empty query requests", async () => {
    const req = mockRequest(null, null, {
      planname: "",
      subscriberid: "",
    });
    const res = mockResponse();

    await deleteOne(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingDeletionParams,
    });
  });

  it("handles subscriber doesn't exist requests", async () => {
    const req = mockRequest(user, null, {
      planname: "Carlotta Prime",
      subscriberid: "008b2cc1-5bb6-11e9-8d9f-d31acbe2f82e",
    });
    const res = mockResponse();

    await deleteOne(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToLocate("subscriber"),
    });
  });

  it("handles valid delete subscriber requests", async () => {
    const existingSub = await db.one(selectSubscriberByKey, [5]);

    const req = mockRequest(user, null, {
      planname: existingSub.planname,
      subscriberid: existingSub.id,
    });
    const res = mockResponse();

    await deleteOne(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
  });
});
