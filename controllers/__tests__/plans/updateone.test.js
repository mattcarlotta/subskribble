import db from "db";
import { selectPlanByKey } from "queries";
import { updateOne } from "controllers/plans";
import { missingUpdateParams, unableToLocate } from "errors";
import { loginUser, mockRequest, mockResponse } from "../../__mocks__/helpers";

const emptybody = {
  amount: "",
  billevery: "",
  planname: "",
  description: "",
  setupfee: "",
};

const updatePlan = {
  amount: 19.99,
  billevery: "Monthly",
  planname: "Carlotta Prime",
  description: "Test",
};

describe("Update A Plan Controller", () => {
  let user;
  beforeAll(async () => {
    user = await loginUser();
  });

  it("handles empty body and empty params requests", async () => {
    const req = mockRequest(null, emptybody, null, { id: "" });
    const res = mockResponse();

    await updateOne(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingUpdateParams,
    });
  });

  it("handles invalid id requests", async () => {
    const req = mockRequest(user, updatePlan, null, {
      id: "008b2cc5-5bb6-11e9-8d9f-c332df99cd01",
    });
    const res = mockResponse();

    await updateOne(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToLocate("plan"),
    });
  });

  it("handles valid update plan requests", async () => {
    const existingPlan = await db.one(selectPlanByKey, [8]);
    const req = mockRequest(user, updatePlan, null, {
      id: existingPlan.id,
    });
    const res = mockResponse();

    await updateOne(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });
});
