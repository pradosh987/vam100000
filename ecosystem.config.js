module.exports = {
  apps: [
    {
      name: "Vamstar",
      script: "./dist/server.js",
      watch: false,
      instances: "0",
      env: {
        NODE_ENV: "development",
      },
      env_staging: {
        NODE_ENV: "staging",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
