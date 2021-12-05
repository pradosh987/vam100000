import express, { Express } from "express";
import * as http from "http";
import { createTerminus } from "@godaddy/terminus";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";

export const app = express();
createTerminus(http.createServer(app));

// Body parses
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CORS config
app.use(cors({ origin: [], credentials: true }));

// Security headers
app.use(helmet());
