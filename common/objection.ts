import Knex from "knex";
import { knexSnakeCaseMappers, Model } from "objection";
import { config } from "./config";
import pg from "pg";
import * as knexfile from "../knexfile";
import { logger } from "./logger";

pg.types.setTypeParser(20, "text", Number);
pg.types.setTypeParser(pg.types.builtins.NUMERIC, Number);

export const knex = Knex({
  // @ts-ignore
  ...knexfile[config.env],
  ...knexSnakeCaseMappers(),
});

knex.on("query-error", (error, data) => {
  logger.error(error, { error, data });
});

// Give the knex instance to objection.
Model.knex(knex);
