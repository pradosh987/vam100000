import { config } from "./common/config";
import { app } from "./common/express";
import { routes } from "./api/v1/routes";

export const startServer = async () => {
  routes(app);
  await new Promise((resolve) => {
    app.listen(config.port, (err?: Error) => {
      if (err) {
        console.error("Error while starting Express server", err);
        throw err;
      }
      console.info("Express server started successfully.");
      resolve(app);
    });
  });
};

startServer().then();
