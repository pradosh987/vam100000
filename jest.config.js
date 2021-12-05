/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.[t]s?(x)", "**/?(*.)+(spec|test).[t]s?(x)"],
  setupFilesAfterEnv: ["./specs/setup/envSetup.ts"],
  globalSetup: "./specs/setup/seed.ts",
  globalTeardown: "./specs/setup/teardown.ts",
};
