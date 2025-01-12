// app.test.js
// import supertest and the express app
const request = require("supertest");
const app = require('../../app');

describe("Country Routes", () => {

  test("GET /api/countries => list countries", () => {
    return request(app)
      .get(`/api/countries`)
      .expect("Content-Type", /json/)
      .expect(200);
  });
});