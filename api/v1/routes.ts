import { Express, Router } from "express";
import * as patientsController from "./patientsController";

export const routes = (app: Express) => {
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  const patientRouter = Router();
  patientRouter.get("/", patientsController.index);
  app.use("/v1/patients", patientRouter);
};
