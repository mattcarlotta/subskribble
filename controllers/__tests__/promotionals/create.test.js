import { create } from "controllers/promotionals";
import { missingCreationParams, itemAlreadyExists } from "errors";
import { loginUser, mockRequest, mockResponse } from "../../__mocks__/helpers";

const emptybody = {
  amount: "",
  discounttype: "",
  enddate: "",
  promocode: "",
  plans: [],
  maxusage: "",
  startdate: "",
};

const promotionalExists = {
  amount: 9.99,
  discounttype: "%",
  enddate: new Date(),
  promocode: "10PERCENTOFF",
  plans: ["Carlotta Prime"],
  maxusage: 1,
  startdate: new Date(),
};

const newPromotional = {
  ...promotionalExists,
  promocode: "NEWPROMOCODE",
};

describe("Create A Promotional Controller", () => {
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

  it("handles promotional already exists requests", async () => {
    const req = mockRequest(user, promotionalExists);
    const res = mockResponse();

    await create(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: itemAlreadyExists("promotional"),
    });
  });

  it("handles valid new promotional requests", async () => {
    const req = mockRequest(user, newPromotional);
    const res = mockResponse();

    await create(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });
});
