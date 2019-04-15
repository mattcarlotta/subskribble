import { create } from "controllers/templates";
import { missingCreationParams, itemAlreadyExists } from "errors";
import { loginUser, mockRequest, mockResponse } from "../../__mocks__/helpers";

const emptybody = {
  fromsender: "",
  plans: [],
  message: "",
  subject: "",
  templatename: "",
};

const templateExists = {
  fromsender: "betatester@subskribble.com",
  plans: ["Carlotta Corp"],
  message: "<span>Hello</span>",
  subject: "Test",
  templatename: "Employee Template",
};

const newTemplate = {
  fromsender: "betatester@subskribble.com",
  plans: ["Carlotta Prime"],
  message: "<span>Test</span>",
  subject: "Test",
  templatename: "New Test Template",
};

describe("Create A Template Controller", () => {
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

  it("handles template already exists requests", async () => {
    const req = mockRequest(user, templateExists);
    const res = mockResponse();

    await create(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: itemAlreadyExists("template"),
    });
  });

  it("handles valid new template requests", async () => {
    const req = mockRequest(user, newTemplate);
    const res = mockResponse();

    await create(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });
});
