import db from "db";
import { selectTemplateByKey } from "queries";
import { updateStatus } from "controllers/templates";
import { missingUpdateParams, unableToLocate } from "errors";
import { loginUser, mockRequest, mockResponse } from "../../__mocks__/helpers";

const emptybody = {
  updateType: "",
  statusType: "",
};

const updateTemplateStatus = {
  updateType: "suspend",
  statusType: "suspended",
};

describe("Update A Template Status Controller", () => {
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
    const req = mockRequest(user, updateTemplateStatus, null, {
      id: "008b2cc5-5bb6-11e9-8d9f-c332df95db01",
    });
    const res = mockResponse();

    await updateStatus(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToLocate("template"),
    });
  });

  it("handles valid template status update requests", async () => {
    const existingtemplate = await db.one(selectTemplateByKey, [2]);
    const req = mockRequest(user, updateTemplateStatus, null, {
      id: existingtemplate.id,
    });
    const res = mockResponse();

    await updateStatus(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });
});
