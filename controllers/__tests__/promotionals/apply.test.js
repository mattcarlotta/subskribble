import { apply } from "controllers/promotionals";
import { invalidPromo, missingSelectParams } from "errors";
import { loginUser, mockRequest, mockResponse } from "../../__mocks__/helpers";

const emptybody = {
  promocode: "",
  plan: "",
};

const invalidPromocode = {
  promocode: "TESTPROMOCODE",
  plan: "Carlotta Prime",
};

const validPromocode = {
  promocode: "FIRST10KACCOUNTS",
  plan: "Carlotta Prime",
};

describe("Apply A Promotional Controller", () => {
  let user;
  beforeAll(async () => {
    user = await loginUser();
  });

  it("handles empty query params requests", async () => {
    const req = mockRequest(null, null, emptybody);
    const res = mockResponse();

    await apply(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingSelectParams,
    });
  });

  it("handles invalid promocode requests", async () => {
    const req = mockRequest(user, null, invalidPromocode);
    const res = mockResponse();

    await apply(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: invalidPromo,
    });
  });
  //
  it("handles valid apply promocode requests", async () => {
    const req = mockRequest(user, null, validPromocode);
    const res = mockResponse();

    await apply(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      promotional: expect.objectContaining({
        id: expect.any(String),
        key: expect.any(Number),
        userid: expect.any(String),
        status: expect.any(String),
        plans: expect.arrayContaining([expect.any(String)]),
        promocode: expect.any(String),
        amount: expect.any(Number),
        discounttype: expect.any(String),
        startdate: expect.any(Date),
        enddate: expect.any(Date),
        maxusage: expect.any(Number),
        totalusage: expect.any(Number),
      }),
    });
  });
});
