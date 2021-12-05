import { config } from "./common/config";

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: config.database.database,
      user: config.database.username,
      password: config.database.password,
    },
    debug: false,
  },

  staging: {
    client: "postgresql",
    connection: {
      database: config.database.database,
      user: config.database.username,
      password: config.database.password,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: config.database.database,
      user: config.database.username,
      password: config.database.password,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};