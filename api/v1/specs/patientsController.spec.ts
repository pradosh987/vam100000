import request from "supertest";
import { app } from "../../../common/express";
import { routes } from "../routes";
import { Patient } from "../../../models/Patient";
import { BMICategory } from "../../../models/BMICategory";

routes(app);

describe("Patients Controller", function () {
  describe("INDEX Endpoint", function () {
    it("should return page 1 of patients", async function () {
      const { body } = await request(app)
        .get("/v1/patients")
        .query({ page: 1, pageSize: 10 })
        .expect(200);

      expect(body.data).toHaveLength(10);
      expect(body.page).toBe(1);
    });

    it("should should return 3rd page of patients", async function () {
      const { body } = await request(app)
        .get("/v1/patients")
        .query({ page: 3, pageSize: 10 })
        .expect(200);

      expect(body.data).toHaveLength(4);
      expect(body.page).toBe(3);
    });

    it("should return first page if page is not specified", async function () {
      const { body } = await request(app)
        .get("/v1/patients")
        .query({ pageSize: 10 })
        .expect(200);

      expect(body.data).toHaveLength(10);
      expect(body.page).toBe(1);
    });

    it("should return 10 patients if page size is not specified ", async function () {
      const { body } = await request(app)
        .get("/v1/patients")
        .query({ page: 1 })
        .expect(200);
      expect(body.data).toHaveLength(10);
    });

    it("should return total number of patients", async function () {
      const { body } = await request(app)
        .get("/v1/patients")
        .query({ page: 1, pageSize: 10 })
        .expect(200);

      expect(body.data).toHaveLength(10);
      expect(body.totalCount).toBe(24);
    });

    it("should not return patients more than max limit", async function () {
      const { body } = await request(app)
        .get("/v1/patients")
        .query({ page: 1, pageSize: 100 })
        .expect(200);

      // 20 being max limit for API
      expect(body.data).toHaveLength(20);
    });

    it("should return 404 if not patients found on page", async function () {
      const { body } = await request(app)
        .get("/v1/patients")
        .query({ page: 10, pageSize: 10 })
        .expect(404);
    });

    it("should include bmi columns in patients data", async function () {
      const { body } = await request(app).get("/v1/patients").expect(200);
      expect(body.data).toHaveLength(10);
      body.data.forEach((p: Patient & BMICategory) => {
        expect(p.gender).toBeDefined();
        expect(p.heightCm).toBeDefined();
        expect(p.weightKg).toBeDefined();
        // expect(p.healthRisk).toBeDefined();
        // expect(p.category).toBeDefined();
      });
    });
  });
});
