import db from "db";
import { selectPlanByKey } from "queries";
import { selectOne } from "controllers/plans";
import { missingSelectParams, unableToLocate } from "errors";
import { loginUser, mockRequest, mockResponse } from "../../__mocks__/helpers";

describe("Select A Plan Controller", () => {
  let user;
  beforeAll(async () => {
    user = await loginUser();
  });

  it("handles empty query params requests", async () => {
    const req = mockRequest(null, null, { id: "" });
    const res = mockResponse();

    await selectOne(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingSelectParams,
    });
  });

  it("handles invalid id requests", async () => {
    const req = mockRequest(user, null, {
      id: "008b2cc5-5bb6-11e9-8d9f-c332df86de02",
    });
    const res = mockResponse();

    await selectOne(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToLocate("plan"),
    });
  });

  it("handles valid select plan requests", async () => {
    const existingPlan = await db.one(selectPlanByKey, [11]);
    const req = mockRequest(user, null, {
      id: existingPlan.id,
    });
    const res = mockResponse();

    await selectOne(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      amount: expect.any(String),
      billevery: expect.any(String),
      planname: expect.any(String),
      description: expect.any(String),
      setupfee: expect.toBeNullOrType(typeof "String"),
      trialperiod: expect.toBeNullOrType(typeof "String"),
    });
  });
});
