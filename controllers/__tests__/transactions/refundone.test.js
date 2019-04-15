import db from "db";
import { selectSubscriberByEmail } from "queries";
import { refundOne } from "controllers/transactions";
import { missingUpdateParams } from "errors";
import { loginUser, mockRequest, mockResponse } from "../../__mocks__/helpers";

const emptybody = {
  amount: "",
  email: "",
  planname: "",
  processor: "",
  subscriber: "",
  transactiontype: "",
};

const refund = {
  amount: 9.99,
  email: "betatester4@subskribble.com",
  planname: "Carlotta Prime",
  processor: "Paypal",
  subscriber: "Matt Carlotta",
  transactiontype: "refund",
};

const credit = {
  amount: 9.99,
  email: "betatester2@subskribble.com",
  planname: "Carlotta Prime",
  processor: "Paypal",
  subscriber: "Sherry Waters",
  transactiontype: "credit",
};

describe("Refund A Transaction Controller", () => {
  let user;
  beforeAll(async () => {
    user = await loginUser();
  });

  it("handles empty body requests", async () => {
    const req = mockRequest(null, emptybody);
    const res = mockResponse();

    await refundOne(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingUpdateParams,
    });
  });

  it("handles valid transaction refund requests", async () => {
    const req = mockRequest(user, refund);
    const res = mockResponse();

    await refundOne(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: `Successfully ${refund.transactiontype}ed ${refund.subscriber}.`,
    });
  });

  it("handles valid transaction credit requests", async () => {
    const req = mockRequest(user, credit);
    const res = mockResponse();

    await refundOne(req, res);
    expect(res.status).toHaveBeenCalledWith(201);

    const creditedUser = await db.one(selectSubscriberByEmail, [credit.email]);
    expect(creditedUser.credits).toEqual("9.99");
  });
});
