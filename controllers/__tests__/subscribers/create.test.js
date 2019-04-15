import { create } from "controllers/subscribers";
import { duplicateSub, missingCreationParams, unableToLocate } from "errors";
import { loginUser, mockRequest, mockResponse } from "../../__mocks__/helpers";

const emptybody = {
  billingAddress: "",
  billingCity: "",
  billingState: "",
  billingUnit: undefined,
  billingZip: "",
  contactAddress: "",
  contactCity: "",
  contactEmail: "",
  contactPhone: "",
  contactState: "",
  contactZip: "",
  sameBillingAddress: "",
  selectedPlan: "",
  subscriber: "",
};

const newSubscriber = {
  billingAddress: "Test Address",
  billingCity: "Test City",
  billingState: "CA",
  billingUnit: undefined,
  billingZip: "55555",
  contactAddress: "Test Address",
  contactCity: "Test City",
  contactEmail: "test444444444@test.com",
  contactPhone: "(555) 555-5555",
  contactState: "CA",
  contactZip: "55555",
  sameBillingAddress: false,
  selectedPlan: "Carlotta Prime",
  subscriber: "Test Tester444444444",
};

const invalidSubscriberPlan = {
  billingAddress: "Test Address",
  billingCity: "Test City",
  billingState: "CA",
  billingUnit: undefined,
  billingZip: "55555",
  contactAddress: "Test Address",
  contactCity: "Test City",
  contactEmail: "test22222222@gmail.com",
  contactPhone: "(555) 555-5555",
  contactState: "CA",
  contactZip: "95124",
  sameBillingAddress: true,
  selectedPlan: "Bad Plan",
  subscriber: "Tester222222222",
};

describe("Create A Subscriber Controller", () => {
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

  it("handles plan doesn't exist requests", async () => {
    const req = mockRequest(user, invalidSubscriberPlan);
    const res = mockResponse();

    await create(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToLocate("plan"),
    });
  });

  it("handles valid new subscriber requests", async () => {
    const req = mockRequest(user, newSubscriber);
    const res = mockResponse();

    await create(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it("handles subscriber already exists requests", async () => {
    const req = mockRequest(user, newSubscriber);
    const res = mockResponse();

    await create(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: duplicateSub(newSubscriber.contactEmail, newSubscriber.selectedPlan),
    });
  });
});
