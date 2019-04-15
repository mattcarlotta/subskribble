import db from "db";
import { selectTemplateByKey } from "queries";
import { updateOne } from "controllers/templates";
import { missingUpdateParams, unableToLocate } from "errors";
import { loginUser, mockRequest, mockResponse } from "../../__mocks__/helpers";

const emptybody = {
  fromsender: "",
  plans: [],
  message: "",
  subject: "",
  templatename: "",
};

const updateTemplate = {
  fromsender: "betatester@subskribble.com",
  plans: ["Carlotta Corp"],
  message: "<span>Hello</span>",
  subject: "Test",
  templatename: "General Newsletter Template",
};

describe("Update A Template Controller", () => {
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
    const req = mockRequest(user, updateTemplate, null, {
      id: "008b2cc5-5cc6-11a9-8f9e-d332df99cd99",
    });
    const res = mockResponse();

    await updateOne(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToLocate("template"),
    });
  });

  it("handles valid update template requests", async () => {
    const existingTemplate = await db.one(selectTemplateByKey, [5]);
    const req = mockRequest(user, updateTemplate, null, {
      id: existingTemplate.id,
    });
    const res = mockResponse();

    await updateOne(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });
});
