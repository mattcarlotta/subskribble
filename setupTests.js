// import db from "db";
// import getCookie from "utils/getCookie";
// import app from "utils/setup";
// import "./controllers/__mocks__/dashboard";

jest.mock('@sendgrid/mail');

// jest.mock("./controllers/dashboard", () => jest.fn((req, res, done) => done()));

expect.extend({
  toBeNullOrType: (received, type) => ({
    message: () => `expected ${received} to be null or ${type}`,
    pass: received === null || typeof received === type,
  }),
});

// global.getCookie = getCookie;
// global.db = db;
// global.app = app;
