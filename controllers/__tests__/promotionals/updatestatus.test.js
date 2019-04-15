import db from "db";
import { selectPromotionCodeByKey } from "queries";
import { updateStatus } from "controllers/promotionals";
import { missingUpdateParams, unableToLocate } from "errors";
import { loginUser, mockRequest, mockResponse } from "../../__mocks__/helpers";

const emptybody = {
  updateType: "",
  statusType: "",
};

const updatePromotional = {
  updateType: "suspend",
  statusType: "suspended",
};

describe("Update A Promotional Status Controller", () => {
  let user;
  beforeAll(async () => {
    user = await loginUser();
  });

  it("handles empty body and empty params requests", async () => {
    const req = mockRequest(null, emptybody, null, { id: "" });
    const res = mockResponse();

    await updateStatus(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingUpdateParams,
    });
  });

  it("handles invalid id requests", async () => {
    const req = mockRequest(user, updatePromotional, null, {
      id: "008b2cc5-5bb6-11e9-8d9f-c332df95db01",
    });
    const res = mockResponse();

    await updateStatus(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToLocate("promotional"),
    });
  });

  it("handles valid promotional status update requests", async () => {
    const existingPromotional = await db.one(selectPromotionCodeByKey, [3]);
    const req = mockRequest(user, updatePromotional, null, {
      id: existingPromotional.id,
    });
    const res = mockResponse();

    await updateStatus(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });
});
