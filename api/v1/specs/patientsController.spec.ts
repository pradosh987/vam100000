import request from "supertest";
import { app } from "../../../common/express";
import { routes } from "../routes";

routes(app);

describe("Patients Controller", function () {
  describe("INDEX Endpoint", function () {
    it("should return a list of patients", async function () {
      await request(app).get("/v1/patients").expect(200);
    });
  });
});
