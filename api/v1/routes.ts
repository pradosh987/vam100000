import { Express, Router } from "express";
import * as patientsController from "./patientsController";
import { objectionJsErrorHandler } from "../../middlewares/errorHandlers/objectionjsErrorHandler";
import { defaultErrorHandler } from "../../middlewares/errorHandlers/defaultErrorHandler";

export const routes = (app: Express) => {
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  const patientRouter = Router();
  patientRouter.get("/", patientsController.index);
  patientRouter.get("/:patientId", patientsController.get);
  app.use("/v1/patients", patientRouter);
  app.use(objectionJsErrorHandler);
  app.use(defaultErrorHandler);
};
