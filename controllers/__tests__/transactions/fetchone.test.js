import db from "db";
import { selectTransactionByKey } from "queries";
import { fetchOne } from "controllers/transactions";
import { missingQueryParams, unableToLocate } from "errors";
import { loginUser, mockRequest, mockResponse } from "../../__mocks__/helpers";

describe("Select A Transaction Controller", () => {
  let user;
  beforeAll(async () => {
    user = await loginUser();
  });

  it("handles empty query params requests", async () => {
    const req = mockRequest(null, null, { id: "" });
    const res = mockResponse();

    await fetchOne(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingQueryParams,
    });
  });

  it("handles invalid id requests", async () => {
    const req = mockRequest(user, null, {
      id: "008b2cc5-5cc6-11a9-8c9f-c332df86de44",
    });
    const res = mockResponse();

    await fetchOne(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToLocate("transaction"),
    });
  });

  it("handles valid select transaction requests", async () => {
    const existingTransaction = await db.one(selectTransactionByKey, [2]);
    const req = mockRequest(user, null, {
      id: existingTransaction.id,
    });
    const res = mockResponse();

    await fetchOne(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      email: expect.any(String),
      planname: expect.any(String),
      processor: expect.any(String),
      subscriber: expect.any(String),
    });
  });
});
