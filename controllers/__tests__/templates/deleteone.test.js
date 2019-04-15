import db from "db";
import { selectTemplateByKey } from "queries";
import { deleteOne } from "controllers/templates";
import { missingDeletionParams, unableToLocate } from "errors";
import { loginUser, mockRequest, mockResponse } from "../../__mocks__/helpers";

describe("Delete A Template Controller", () => {
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

  it("handles template doesn't exist requests", async () => {
    const req = mockRequest(user, null, null, {
      id: "008b2cc1-5bb6-11e9-8d9f-e31ff5f2f82b",
    });
    const res = mockResponse();

    await deleteOne(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToLocate("template"),
    });
  });

  it("handles valid delete template requests", async () => {
    const existingTemplate = await db.one(selectTemplateByKey, [6]);

    const req = mockRequest(user, null, null, {
      id: existingTemplate.id,
    });
    const res = mockResponse();

    await deleteOne(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });
});
