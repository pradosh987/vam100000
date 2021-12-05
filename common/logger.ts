import bunyan, { LogLevel } from "bunyan";
import { config } from "./config";
export const logger = bunyan.createLogger({
  name: "vamstar",
  streams: [
    {
      level: config.logLevel as LogLevel,
      stream: process.stdout,
    },
    {
      level: config.logLevel as LogLevel,
      path: "./logs/all.log",
    },
  ],
});
