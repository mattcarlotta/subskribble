import db from "db";
import { selectPromotionCodeByKey } from "queries";
import { deleteOne } from "controllers/promotionals";
import { missingDeletionParams, unableToLocate } from "errors";
import { loginUser, mockRequest, mockResponse } from "../../__mocks__/helpers";

describe("Delete A Promotional Controller", () => {
  let user;
  beforeAll(async () => {
    user = await loginUser();
  });

  it("handles empty body requests", async () => {
    const req = mockRequest(null, null, null, { id: "" });
    const res = mockResponse();

    await deleteOne(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingDeletionParams,
    });
  });

  it("handles promotional doesn't exist requests", async () => {
    const req = mockRequest(user, null, null, {
      id: "008b2cc1-5bb6-11e9-8d9f-d31efaf2f82c",
    });
    const res = mockResponse();

    await deleteOne(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToLocate("promotional"),
    });
  });

  it("handles valid delete promotional requests", async () => {
    const existingPromo = await db.one(selectPromotionCodeByKey, [5]);

    const req = mockRequest(user, null, null, {
      id: existingPromo.id,
    });
    const res = mockResponse();

    await deleteOne(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });
});
