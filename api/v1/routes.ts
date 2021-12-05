import { Express } from "express";

export const routes = (app: Express) => {
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
};
