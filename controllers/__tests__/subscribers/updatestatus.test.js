import db from "db";
import { selectSubscriberByKey } from "queries";
import { updateStatus } from "controllers/subscribers";
import { missingUpdateParams, unableToLocate } from "errors";
import { loginUser, mockRequest, mockResponse } from "../../__mocks__/helpers";

const emptybody = {
  updateType: "",
  statusType: "",
};

const updateSubscriberStatus = {
  updateType: "suspend",
  statusType: "suspended",
};

describe("Update A Subscriber Status Controller", () => {
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
    const req = mockRequest(user, updateSubscriberStatus, null, {
      id: "008b2cc5-5bb6-11e9-8d9f-d332dc95de0a",
    });
    const res = mockResponse();

    await updateStatus(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToLocate("subscriber"),
    });
  });

  it("handles valid subscriber status update requests", async () => {
    const existingSubscriber = await db.one(selectSubscriberByKey, [7]);
    const req = mockRequest(user, updateSubscriberStatus, null, {
      id: existingSubscriber.id,
    });
    const res = mockResponse();

    await updateStatus(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });
});
