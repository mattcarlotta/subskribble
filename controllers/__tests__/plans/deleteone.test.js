import db from "db";
import { selectPlanByKey } from "queries";
import { deleteOne } from "controllers/plans";
import { missingDeletionParams, unableToLocate } from "errors";
import { loginUser, mockRequest, mockResponse } from "../../__mocks__/helpers";

describe("Delete A Plan Controller", () => {
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

  it("handles plan doesn't exist requests", async () => {
    const req = mockRequest(user, null, null, {
      id: "008b2cc1-5bb6-11e9-8d9f-e31efaf2f82a",
    });
    const res = mockResponse();

    await deleteOne(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToLocate("plan"),
    });
  });

  it("handles valid delete plan requests", async () => {
    const existingPlan = await db.one(selectPlanByKey, [5]);

    const req = mockRequest(user, null, null, {
      id: existingPlan.id,
    });
    const res = mockResponse();

    await deleteOne(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });
});
