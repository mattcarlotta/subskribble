import db from "db";
import { selectTransactionByKey } from "queries";
import { deleteOne } from "controllers/transactions";
import { missingDeletionParams, unableToLocate } from "errors";
import { loginUser, mockRequest, mockResponse } from "../../__mocks__/helpers";

describe("Delete A Transaction Controller", () => {
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

  it("handles transaction doesn't exist requests", async () => {
    const req = mockRequest(user, null, null, {
      id: "008b2cc1-6bb6-11a9-7d9f-f31ebaf2f625",
    });
    const res = mockResponse();

    await deleteOne(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToLocate("transaction"),
    });
  });

  it("handles valid delete transaction requests", async () => {
    const existingTransaction = await db.one(selectTransactionByKey, [9]);

    const req = mockRequest(user, null, null, {
      id: existingTransaction.id,
    });
    const res = mockResponse();

    await deleteOne(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });
});
