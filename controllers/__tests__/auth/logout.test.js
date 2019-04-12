import { logout } from "controllers/auth";
import { mockRequest, mockResponse, signupUser } from "../../__mocks__/helpers";

const newSignupEmail = "logoutuser@test.com";
const newCompany = "Logout Handlers LLC";

describe("Logout Session Controller", () => {
  let user;
  beforeAll(async () => {
    user = await signupUser(newSignupEmail, newCompany);
  });

  it("handles valid logout session requests", async () => {
    const req = mockRequest(user);
    const res = mockResponse();

    await logout(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith("Cookie deleted.");
  });
});
