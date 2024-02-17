const config = {
  development: {
    PORT: 3000,
    DB_CONNECTION: "mongodb://localhost:27017/gaming-team",
    SALT_ROUNDS: 5,
    SECRET: "secret",
  },
  production: {
    PORT: 80,
  },
};

module.exports = config;
