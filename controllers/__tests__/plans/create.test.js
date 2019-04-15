import { create } from "controllers/plans";
import { missingCreationParams, itemAlreadyExists } from "errors";
import { loginUser, mockRequest, mockResponse } from "../../__mocks__/helpers";

const emptybody = {
  amount: "",
  billevery: "",
  planname: "",
  description: "",
  setupfee: "",
};

const planExists = {
  amount: 9.99,
  billevery: "Monthly",
  planname: "Carlotta Prime",
  description: "Test",
};

const newPlan = {
  ...planExists,
  planname: "New Awesome Plan",
};

describe("Create A Plan Controller", () => {
  let user;
  beforeAll(async () => {
    user = await loginUser();
  });

  it("handles empty body requests", async () => {
    const req = mockRequest(null, emptybody);
    const res = mockResponse();

    await create(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingCreationParams,
    });
  });

  it("handles valid new plan requests", async () => {
    const req = mockRequest(user, newPlan);
    const res = mockResponse();

    await create(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it("handles plan already exists requests", async () => {
    const req = mockRequest(user, newPlan);
    const res = mockResponse();

    await create(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: itemAlreadyExists("plan"),
    });
  });
});
